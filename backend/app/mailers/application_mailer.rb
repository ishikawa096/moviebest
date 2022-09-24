class ApplicationMailer < ActionMailer::Base
  default from: "#{ENV.fetch('APP_NAME', 'info')}<norepry@#{ENV.fetch('APP_HOST', 'example.com')}>"
  layout 'mailer'
end
