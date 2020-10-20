class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  # after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index
  helper_method :owner?
  helper_method :has_any_chatroom_new_message?

  def owner?(record)
    record.user == current_user
  end

  def check_owner
    if params[:user_id] != current_user.nick_name.downcase
      redirect_to root_path
    end
  end

  # 問號結尾的方法通常會是要回傳 boolean 但這邊似乎是回傳數字
  def has_any_chatroom_new_message?
    any_new_message_chatroom = redis.lrange("#{current_user.id}_chat_notice",0,-1)
    any_new_message_chatroom.delete("")
    if any_new_message_chatroom.length == 0
      redis.del("#{current_user.id}_chat_notice")
    end
    any_new_message_chatroom.length
  end
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nick_name, :description])
  end

  def redis
    @redis||= Redis.new
  end

  private

  def not_authorized
    redirect_to root_path, notice: '權限不足'
  end
end
