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

  def check_owner
    if params[:user_id].to_i != current_user.id
      redirect_to root_path
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nick_name, :description])
  end

  private

  def not_authorized
    redirect_to root_path, notice: '權限不足'
  end
end
