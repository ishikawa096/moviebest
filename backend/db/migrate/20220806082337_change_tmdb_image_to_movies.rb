class ChangeTmdbImageToMovies < ActiveRecord::Migration[6.1]
  def change
    change_column_null :movies, :tmdb_image, true
    change_column_default :movies, :tmdb_image, from: "", to: nil
  end
end
