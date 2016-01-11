require 'test_helper'

class Api::V1::LinksControllerTest < ActionController::TestCase

  test "controller responds to json" do
    get :index, format: :json
    assert_response :success
  end

  test 'index returns an array of records' do
    get :index, format: :json

    assert_kind_of Array, json_response
  end

  test '#index returns the correct number of links' do
    get :index, format: :json

    assert_equal Link.count, json_response.count
  end
end
