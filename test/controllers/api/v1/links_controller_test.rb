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

  test '#index contains links with the correct properties' do
    get :index, format: :json

    json_response.each do |link|
      assert link["title"]
      assert link["url"]
    end
  end

  test "links controller responds to json" do
    id = links(:one).id

    get :show, id: id, format: :json
    assert_response :success
  end

  test "#show responds with a particular link" do
    id = links(:one).id

    get :show, id: id, format: :json

    assert_equal id, json_response["id"]
  end

  test "#create adds an additional link to to the database" do
    assert_difference 'Link.count', 1 do
      link = { title: "New Link", url: "http://zumba.com" }

      post :create, link: link, format: :json
    end
  end

  test "#create returns the new link" do
    link = { title: "New Link", url: "http://zumba.com" }

    post :create, link: link, format: :json

    #require "pry"; binding.pry
    assert_equal link[:title], json_response["title"]
    assert_equal link[:url], json_response["url"]
    assert_equal false, json_response["read"]
  end
end
