require 'test_helper'

class BasicTemplateTest < ActionDispatch::IntegrationTest

  test "it loads a page at the application root" do
    visit root_path
    assert_equal 200, page.status_code
  end

  test "it has an <h1> tag with the content Thought Box" do
    visit root_path
    assert page.find("h1").has_content? "Thought Box"
  end

  test "it has an links container on the page" do
    visit root_path
    assert page.has_css? ".links"
  end

  test "it has a form for creating new links" do
    visit root_path
    assert page.has_css? "form.new-link"
  end

  test "form has an text input for a new link title" do
    visit root_path
    assert page.has_css? "form.new-link input[type='text'].new-link-title"
  end

  test "form has an text input for a new link button" do
    visit root_path
    assert page.has_css? "form.new-link input[type='text'].new-link-body"
  end

  test "form has an input button" do
    visit root_path
    save_and_open_page
    assert page.has_css? "form.new-link input[type='submit'].new-link-submit"
  end
end
