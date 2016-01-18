require 'test_helper'

class CreatingLinksTest < ActionDispatch::IntegrationTest

  def setup
    use_javascript
    user_login
  end

  def teardown
    reset_driver
  end

  test "it should load all of the links with an .link div" do
    wait_for_ajax
    within :css, '.links' do
      assert_equal Link.count, page.find_all('.link').count
    end
  end

  test "it adds a new link to the page" do
    assert_difference "page.find_all('.link').count", 1 do
      page.fill_in "link[title]", with: "Special Link"
      page.fill_in "link[url]", with: "http://speciallink.com"
      page.click_button "Submit Link"

      wait_for_ajax
    end
  end
end
