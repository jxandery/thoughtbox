require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  test 'it should be invalid without a title and url' do
    link_without_title_or_url = Link.new
    refute(link_without_title_or_url.valid?)
  end

  test 'it should be invalid without a title' do
    link = Link.new(url: 'body')
    refute(link.valid?)
  end

  test 'it should be invalid without a url' do
    link = Link.new(title: 'title')
    refute(link.valid?)
  end

  test 'it should be invalid without a valid url' do
    link = Link.new(title: 'title', url: 'asdfpoij')
    refute(link.valid?)
  end

end
