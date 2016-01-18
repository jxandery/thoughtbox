ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
require 'capybara/rails'
require 'database_cleaner'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

class ActionController::TestCase
  include Capybara::DSL

  def json_response
    JSON.parse response.body
  end

  def user_login
    user = User.create(email_address: "new_user@example.com", password: "password")
    session[:user_id] = user.id
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

  DatabaseCleaner.strategy = :truncation
  self.use_transactional_fixtures = false

  def setup
    DatabaseCleaner.start
  end

  def teardown
    reset_session!
    DatabaseCleaner.clean
  end

  def user_login
    user = User.create(email_address: "jack@example.com", password: "password")

    visit login_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    click_button "Login"
  end

  def use_javascript
    Capybara.current_driver = Capybara.javascript_driver
  end

  def reset_driver
    Capybara.current_driver = nil
  end

  def wait_for_ajax
    Timeout.timeout(Capybara.default_max_wait_time) do
      loop until finished_all_ajax_requests?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active').zero?
  end
end
