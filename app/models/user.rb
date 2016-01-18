class User < ActiveRecord::Base
  has_many :links
  has_secure_password

  validates :email_address, uniqueness: true
end

