class Link < ActiveRecord::Base
  belongs_to :user
  validates :title, :url, presence: true
  validates :url, :url => true
  #validates :read, inclusion: { in: %w(true false) }
end
