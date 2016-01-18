class Api::V1::LinksController < ApplicationController
  respond_to :html, :json, :xml

  def index
    respond_with Link.where(user_id: current_user.id).order(created_at: :asc)
  end

  def show
    respond_with Link.find(params[:id])
  end

  def create
    link = current_user.links.create(link_params)
    if link.save
      render json: link, status: 201
    else
      render json: { errors: link.errors }, status: 422, location: api_v1_links_path
    end
  end

  def update
    link = Link.find(params[:id])
    if link.update(link_params)
      respond_with(link, status: 200, location: api_v1_link_path(link))
    else
      render json: link.errors, status: 422
    end
  end

  def destroy
    Link.find(params[:id]).destroy
    head :no_content
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end
end
