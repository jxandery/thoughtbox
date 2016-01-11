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

  test "it is valid with a read value of true" do
    links(:one).read = true

    assert(links(:one).valid?)
  end

  test "it is valid with a read value of false" do
    links(:one).read = false

    assert(links(:one).valid?)
  end

  #test "it is invalid with any other quality" do
  #links(:one).read = 1

  #refute(links(:one).valid?)
  #end

end
