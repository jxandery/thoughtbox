#require 'test_helper'
require './test/test_helper'

class UserTest < ActiveSupport::TestCase
  test 'it should be invalid without an email and password' do
    user_without_email_or_password = User.new
    refute(user_without_email_or_password.valid?)
  end

  #test 'it should be invalid without a title' do
    #link = Link.new(url: 'http://urlgalore.com')
    #refute(link.valid?)
  #end

  #test 'it should be invalid without a url' do
    #link = Link.new(title: 'title')
    #refute(link.valid?)
  #end

  #test 'it should be invalid without a valid url' do
    #link = Link.new(title: 'title', url: 'asdfpoij')
    #refute(link.valid?)
  #end
end
