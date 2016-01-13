class CreatingLinksTest < ActionDispatch::IntegrationTest

  def setup
    super
    use_javascript
    visit root_path
  end

  def teardown
    super
    reset_driver
  end

  test "it creates a new link upon form submission" do
    assert_difference 'Link.count', 1 do
      page.fill_in "link[title]", with: "Special Link"
      page.fill_in "link[url]", with: "http://speciallink.com"
      page.click_button "Submit Link"

      wait_for_ajax
    end
  end
end
