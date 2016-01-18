require 'test_helper'

class ChangingReadStatusTest < ActionDispatch::IntegrationTest

  def setup
    use_javascript
    user_login
  end

  def teardown
    reset_driver
  end

  test "clicking read button should strike through link and toggle to read" do
    cnn = Link.create(title: 'cnn', url: 'http://cnn.com')

    within(".read-true") do
      click_on("read")
    end
  end
end
