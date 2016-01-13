class CreatingLinksTest < ActionDispatch::IntegrationTest

  def setup
    use_javascript
    visit root_path
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
end
