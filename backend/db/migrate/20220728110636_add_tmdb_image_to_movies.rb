class AddTmdbImageToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :tmdb_image, :string, default: "", null: false
  end
end
