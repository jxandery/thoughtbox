require 'test_helper'

class BasicTemplateTest < ActionDispatch::IntegrationTest

  def setup
    user_login
  end

  def teardown
    reset_driver
  end

  test "it loads a page at the application root" do
    assert_equal 200, page.status_code
  end

  test "it has an <h1> tag with the content Links Index" do
    assert page.find("h1").has_content? "Links Index"
  end

  test "it has an links container on the page" do
    assert page.has_css? ".links"
  end

  test "it has a form for creating new links" do
    assert page.has_css? "form.new-link"
  end

  test "form has an text input for a new link title" do
    assert page.has_css? "form.new-link input[type='text'].new-link-title"
  end

  test "form has an text input for a new link button" do
    assert page.has_css? "form.new-link input[type='text'].new-link-url"
  end

  test "form has an input button" do
    assert page.has_css? "form.new-link input[type='submit'].new-link-submit"
  end
end
