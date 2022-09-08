class AddForeignKeyToMovies < ActiveRecord::Migration[6.1]
  def change
    change_column :movies, :list_id, :bigint
    add_foreign_key :movies, :lists, on_delete: :cascade
  end
end
