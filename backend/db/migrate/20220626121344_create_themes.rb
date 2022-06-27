class CreateThemes < ActiveRecord::Migration[6.1]
  def change
    create_table :themes do |t|
      t.string :title
      t.integer :capacity
      t.timestamps
    end
  end
end
