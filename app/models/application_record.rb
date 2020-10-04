class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def friendly_params     #使用 SHA1 產生 params
    Digest::SHA1.hexdigest([Time.now, rand].join)
  end
end
