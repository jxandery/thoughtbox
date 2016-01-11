class Api::V1::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with Link.all
  end
end
