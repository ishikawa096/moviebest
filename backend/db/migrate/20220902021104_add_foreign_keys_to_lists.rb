class AddForeignKeysToLists < ActiveRecord::Migration[6.1]
  def change
    change_column :lists, :user_id, :bigint
    change_column :lists, :theme_id, :bigint
    add_foreign_key :lists, :users, on_delete: :cascade
    add_foreign_key :lists, :themes
  end
end
