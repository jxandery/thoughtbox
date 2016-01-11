require 'test_helper'

class UserCreationTest < ActionDispatch::IntegrationTest

  test 'a user can be created' do
    visit new_user_path
    fill_in "Email address", with: "jack"
    fill_in "Password", with: "password"
    click_button "Create Account"

    assert page.has_content?("Welcome, jack")
  end
end
