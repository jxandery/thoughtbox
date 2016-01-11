class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email_address: params[:session][:email_address])
    if @user
      session[:user_id] = @user.id
      redirect_to @user
    else
      render 'new'
    end
  end
end
