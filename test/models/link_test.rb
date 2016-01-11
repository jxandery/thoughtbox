require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  test 'it should be invalid without a title or url' do
    link_without_title_or_url = Link.new
    refute(link_without_title_or_url.valid?)
  end
end
