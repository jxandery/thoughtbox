require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  test 'it should be invalid without a title and url' do
    link_without_title_or_url = Link.new
    refute(link_without_title_or_url.valid?)
  end

  test 'it should be invalid without a title' do
    link = Link.new(url: 'http://urlgalore.com')
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

  test "it is valid with a read value of true" do
    link = Link.new(title: 'title', url: 'http://asdfpoij.com')
    link.read = true

    assert(link.valid?)
  end

  test "it is valid with a read value of false" do
    link = Link.new(title: 'title', url: 'http://asdfpoij.com')
    link.read = false

    assert(link.valid?)
  end

end
