require 'net/http'

class Tmdb::SearchClient
  DEFAULT_LANG = 'ja'.freeze

  def self.get(keyword)
    uri = URI.parse(ENV.fetch('TMDB_SEARCH_MOVIE_URI', nil))
    headers = { Authorization: "Bearer #{ENV.fetch('TMDB_API_KEY', nil)}" }
    query = { language: DEFAULT_LANG, query: keyword }
    uri.query = URI.encode_www_form(query)
    client = Net::HTTP.new(uri.host, uri.port)
    client.use_ssl = uri.scheme == 'https'
    client.get(uri, headers)
  end
end
