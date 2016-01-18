require 'test_helper'

class UserCreationTest < ActionDispatch::IntegrationTest

  test 'a user can be created' do
    visit new_user_path
    fill_in "Email address", with: "jack"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    assert page.has_content?("Welcome, jack")
  end

  test "user email must be unique" do
    user = User.create(email_address: "justin@example.com", password: "password")

    visit new_user_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    refute page.has_content?("Invalid Email Address")
  end
end
