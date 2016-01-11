require 'test_helper'

class BasicTemplateTest < ActionDispatch::IntegrationTest

  test "it loads a page at the application root" do
    visit root_path
    assert_equal 200, page.status_code
  end
end
