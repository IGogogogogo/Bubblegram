class PagesController < ApplicationController
  skip_before_action :authenticate_user!

  def index
  end

  def search
  end
end
