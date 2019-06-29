require 'digest/md5'

class Message < ApplicationRecord
  validate :name, presence: true
  validate :body, presence: true
  validate :sent_at, presence: true

  def avatar
    "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(name.to_s)}?d=identicon&f=y"
  end

  after_create_commit do
    MessageBroadcastJob.perform_later self
  end
end
