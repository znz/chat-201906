require 'digest/md5'

class Message < ApplicationRecord
  validates :remote_ip, presence: true
  validates :request_id, presence: true
  validates :name, presence: true
  validates :body, presence: true
  validates :sent_at, presence: true

  scope :recent, -> { where(created_at: 1.hour.ago..nil).order(created_at: :desc).limit(50) }

  def avatar_id
    "#{remote_ip} #{request_id} #{name}"
  end

  def avatar
    "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(avatar_id)}?d=identicon&f=y"
  end

  def to_chat_hash
    {
      id: id,
      name: name,
      body: body,
      sent_at: sent_at,
      avatar: avatar,
    }
  end

  after_create_commit do
    MessageBroadcastJob.perform_later self
  end
end
