require 'test_helper'

class UserLogoutTest < ActionDispatch::IntegrationTest
  test "logged in user can log out" do
    user = User.create(email_address: "jack@example.com", password: "password")

    visit login_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    click_button "Login"

    assert page.has_content?("Welcome, jack@example.com")

    click_link "Logout"

    refute page.has_content?("Welcome, jack@example.com")
  end
end
