class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('APP_NAME', 'info')
  layout 'mailer'
end
