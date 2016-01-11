class Link < ActiveRecord::Base
  validates :title, :url, presence: true
  validates :url, :url => true
end
