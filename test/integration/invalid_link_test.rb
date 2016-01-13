require 'test_helper'

class InvalidLinkTest < ActionDispatch::IntegrationTest

  def setup
    super
    use_javascript
    visit root_path
  end

  def teardown
    super
    reset_driver
  end

  test "it does not create a new link upon invalid form submission" do
    assert_difference 'Link.count', 0 do
      page.fill_in "link[title]", with: ''
      page.fill_in "link[url]", with: ''
      page.click_button "Submit Link"
      wait_for_ajax
    end
  end

  test "it shows an error saying that the title or url cannot be blank if missing" do
    page.click_button "Submit Link"

    wait_for_ajax

    assert page.find('.new-link-messages').has_content? 'Title and/or url cannot be blank.'
  end

  test "it removes the error on subsequent submissions" do
    page.click_button "Submit Link"

    wait_for_ajax

    page.fill_in "link[title]", with: "Special Links"
    page.fill_in "link[url]", with: "http://speciallinks.com"
    page.click_button "Submit Link"

    refute page.find('.new-link-messages').has_content? 'Title and/or url cannot be blank.'
  end
end
