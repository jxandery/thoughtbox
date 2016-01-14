require 'test_helper'

class ChangingReadStatusTest < ActionDispatch::IntegrationTest

  def setup
    use_javascript
  end

  def teardown
    reset_driver
  end

  test "clicking read button should strike through link and toggle to read" do
    visit root_path
    cnn = Link.find_by(url: 'http://cnn.com')

    save_and_open_page

    within(".read-true") do
      click_on("read")
    end

    save_and_open_page
  end
end
