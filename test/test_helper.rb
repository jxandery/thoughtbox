ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
require 'capybara/rails'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

class ActionController::TestCase
  def json_response
    JSON.parse response.body
  end
end

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include Capybara::DSL
  include Rails.application.routes.url_helpers

  def use_javascript
    Capybara.current_driver = Capybara.javascript_driver
  end

  def reset_driver
    Capybara.current_driver = nil
  end

  def teardown
    reset_session!
  end
end
