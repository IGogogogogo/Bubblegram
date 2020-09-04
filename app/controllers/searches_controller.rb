class SearchesController < ApplicationController
  def index
  end

  def search
    #keyword 存在的話搜尋 user 包含 keyword 的 nick_name
    if params[:keyword].present?
      @users = User.includes(:fans).where.not(id: current_user.id).where("nick_name LIKE ?", "%#{params[:keyword]}%").limit(10)
    end
  end
end
