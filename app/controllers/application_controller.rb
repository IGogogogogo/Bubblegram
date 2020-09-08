class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  # helper_method :already_followed

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nick_name, :description])
  end

  # def already_followed(user)                  #檢查自己是否已經追蹤對方
  #   user.fans.include?(current_user)
  # end
end
