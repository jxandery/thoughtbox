class Link < ActiveRecord::Base
  validates :title, :url, presence: true
  validates :url, :url => true
  #validates :read, inclusion: { in: %w(true false) }
end
