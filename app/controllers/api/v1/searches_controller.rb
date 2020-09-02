class Api::V1::SearchesController < ApplicationController
  def show
    @users = User.where("nick_name LIKE ?", "%#{params[:keyword]}%")
    render json: @users
  end
end
