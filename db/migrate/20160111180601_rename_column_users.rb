class RenameColumnUsers < ActiveRecord::Migration
  def change
    rename_column :users, :username, :email_address
  end
end
