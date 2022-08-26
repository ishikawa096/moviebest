class AddTmdbIdToMovies < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :tmdb_id, :integer
  end
end
