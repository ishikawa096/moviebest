class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :position
      t.integer :list_id
      t.timestamps
    end
  end
end
