class Api::V1::LinksController < ApplicationController
  respond_to :html, :json, :xml

  def index
    respond_with Link.all
  end

  def show
    respond_with Link.find(params[:id])
  end

  def create
    link = Link.new(link_params)
    if link.save
      respond_with(link, status: 201, location: api_v1_link_path(link))
    else
      render json: { errors: link.errors }, status: 422, location: api_v1_links_path
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end
end
