require 'net/http'

class Tmdb::ImagesClient
  def self.get(tmdb_id)
    uri = URI.parse("#{ENV.fetch('TMDB_MOVIE_BASE_URI', nil)}/#{tmdb_id}/images")
    headers = { Authorization: "Bearer #{ENV.fetch('TMDB_API_KEY', nil)}" }
    client = Net::HTTP.new(uri.host, uri.port)
    client.use_ssl = uri.scheme == 'https'
    client.get(uri, headers)
  end
end
