CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:               'AWS',
    aws_access_key_id:      ENV['S3_ACCESS_KEY'],
    aws_secret_access_key:  ENV['S3_SECRET_KEY'],
    host: ENV['S3_HOST'],
    region: ENV['S3_REGION']
  }
  config.fog_directory = ENV['S3_BUCKET']
end
