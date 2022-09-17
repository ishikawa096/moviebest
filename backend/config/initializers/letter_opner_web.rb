
if Rails.env.development?
  LetterOpenerWeb.configure do |config|
    config.letters_location = Rails.root.join('.letter_openner')
  end
end
