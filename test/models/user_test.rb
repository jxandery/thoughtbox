require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'it should be invalid without an email and password' do
    user_without_email_or_password = User.new
    refute(user_without_email_or_password.valid?)
  end

  test 'it should be invalid without an email' do
    user = User.new(password: 'password', password_confirmation: 'password')
    refute(user.valid?)
  end

  test 'it should be invalid without password' do
    user = User.new(email_address: 'simple@example.com', password_confirmation: 'password')
    refute(user.valid?)
  end
end
