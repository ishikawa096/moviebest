require 'rails_helper'

RSpec.describe 'tmdb', type: :request do
  subject { JSON.parse(response.body) }

  let(:api_auth) { { Authorization: "Bearer #{ENV.fetch('BACKEND_API_KEY', nil)}" } }
  let(:uri) { URI.parse(ENV.fetch('TMDB_SEARCH_MOVIE_URI', nil)) }
  let(:tmdb_auth) { { Authorization: "Bearer #{ENV.fetch('TMDB_API_KEY', nil)}" } }
  let(:query) { { language: 'ja', query: 'ミニオンズ' } }
  let(:path) { api_v1_tmdb_search_path }
  let(:body) do
    JSON.generate(page: 1,
      results: [
        { adult: false, backdrop_path: '/jpg', genre_ids: [], id: 211_672,
          original_language: 'en', original_title: '', overview: '', popularity: 1,
          poster_path: '/jpg', release_date: '', title: 'ミニオンズ',
          video: false, vote_average: 0, vote_count: 0 },
        { adult: false, backdrop_path: '/jpg', genre_ids: [], id: 665_000,
          original_language: 'en', original_title: '', overview: '', popularity: 1,
          poster_path: '/jpg', release_date: '', title: 'ミニオンズ 9ミニ・ムービー・コレクション',
          video: false, vote_average: 0, vote_count: 0 },
        { adult: false, backdrop_path: '/jpg', genre_ids: [], id: 438_148,
          original_language: 'en', original_title: '', overview: '', popularity: 1,
          poster_path: '/jpg', release_date: '', title: 'ミニオンズ フィーバー',
          video: false, vote_average: 0, vote_count: 0 }
      ], total_pages: 1, total_results: 3)
  end

  describe '#search' do
    context 'keywordがあるとき' do
      before do
        stub_request(:get, uri)
          .with(headers: tmdb_auth, query:)
          .to_return(
            status: 200,
            body:
          )
        get path, headers: api_auth, params: { keyword: 'ミニオンズ' }
      end

      it 'レスポンスに成功すること' do
        expect(response).to have_http_status(:ok)
      end

      it '取得データを返すこと' do
        expect(subject).to eq(JSON.parse(body))
      end
    end

    context 'keywordが空のとき' do
      it 'ステータス400とエラーメッセージを返すこと' do
        get path, headers: api_auth, params: { keyword: '' }
        expect(response).to have_http_status(:bad_request)
        expect(subject['message']).to eq 'Keyword is requred'
      end
    end

    context 'keywordがnilのとき' do
      it 'ステータス400とエラーメッセージを返すこと' do
        get path, headers: api_auth, params: { keyword: nil }
        expect(response).to have_http_status(:bad_request)
        expect(subject['message']).to eq 'Keyword is requred'
      end
    end

    context '外部APIで認証エラーが起きたとき' do
      before do
        stub_request(:get, uri)
          .with(query:)
          .to_return(
            status: 401,
            body: JSON.generate(status_code: 7,
              status_message: 'Invalid API key',
              success: false)
          )
        get path, headers: api_auth, params: { keyword: 'ミニオンズ' }
      end

      it 'ステータス:unauthorizedとメッセージを返すこと' do
        expect(response).to have_http_status(:unauthorized)
        expect(subject['message']).to eq 'API error (Invalid API key)'
      end
    end
  end
end
