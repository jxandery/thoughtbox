require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest

  test "registered user can login" do
    user = User.create(email_address: "jack", password: "password")

    visit login_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    click_button "Login"

    assert page.has_content?("Welcome, jack")
  end
end
