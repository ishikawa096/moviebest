class UserMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers

  def confirmation_instructions(record, token, opts = {})
    opts[:subject] = if record.unconfirmed_email.nil?
                       'アカウントの有効化'
                     else
                       'メールアドレス変更手続き'
                     end
    super
  end

  def headers_for(action, opts)
    super.merge!(template_path: 'users/mailer')
  end
end
