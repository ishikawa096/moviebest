class CreateLists < ActiveRecord::Migration[6.1]
  def change
    create_table :lists do |t|
      t.text :comment
      t.boolean :numbered, null: false, default: false
      t.integer :theme_id
      t.integer :user_id
      t.timestamps
    end
  end
end
