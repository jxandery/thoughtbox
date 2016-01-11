class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email_address: params[:session][:email_address])
    if @user
      session[:user_id] = @user.id
      redirect_to api_v1_links_path
    else
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to login_path
  end
end
