class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email_address: session_params[:email_address])
    if @user && @user.authenticate(session_params[:password])
      session[:user_id] = @user.id
      redirect_to links_path
    else
      render 'new'
    end
  end

  def destroy
    session.clear
    redirect_to login_path
  end

  private

  def session_params
    params.require(:session).permit(:email_address, :password)
  end
end
