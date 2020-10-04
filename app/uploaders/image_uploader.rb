class ImageUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick
  include CarrierWave::Video
  # include CarrierWave::Video::Thumbnailer

  after :store, :remove_original_file

  # Choose what kind of storage to use for this uploader: #檔案儲存位置
  if Rails.env.production?
    storage :fog
  elsif Rails.env.staging?
    storage :fog
  else
    storage :file
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:

  #壓縮上傳檔案
  #image
  version :resized, :if => :image? do
    process resize_to_fill: [400, 350]
  end
  #video
  version :rescaled, :if => :video? do
    process :encode
  end

  def store_dir                #檔案儲存路徑
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_whitelist        #可以上傳的檔案類型
    %w(jpg jpeg gif png mp4)
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  def encode        #用 FFMPEG 壓縮影片
    movie = ::FFMPEG::Movie.new(current_path)
    tmp_path = File.join( File.dirname(current_path), "tmpfile.mp4" )
    options = {
      frame_rate: 10,
      resolution: "320x240"
    }
    movie.transcode(tmp_path, options)
    File.rename tmp_path, current_path
  end

  def remove_original_file(file)            #刪除原檔
    File.delete if version_name.blank?
  end

  private

  #判斷檔案類型
  def image?(new_file)
    new_file.content_type.include? 'image'
  end

  def video?(new_file)
    new_file.content_type.include? 'video'
  end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
