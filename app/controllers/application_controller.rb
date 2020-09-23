class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index
  helper_method :owner?

  def owner?(record)
    record.user == current_user
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nick_name, :description])
  end

  def redis
    @redis =  Redis.new unless @redis
    @redis
  end
  # def already_followed(user)                  #檢查自己是否已經追蹤對方
  #   user.fans.include?(current_user)
  # end

  # def default_url_options(options = {})
  #   host_options = if Rails.env.development?
  #     { host: request.headers["HTTP_X_ORIGINAL_HOST"] }
  #   else
  #     {}
  #   end
  #   options.merge(host_options)
  # end
  private

  def not_authorized
    redirect_to root_path, notice: '權限不足'
  end
end
