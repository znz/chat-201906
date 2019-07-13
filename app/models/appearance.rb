class Appearance < ApplicationRecord
  validates :remote_ip, presence: true
  validates :request_id, presence: true
  validates :name, presence: true

  include Gravatar

  def to_chat_hash
    {
      id: id,
      name: name,
      avatar: avatar,
    }
  end

  after_commit do
    AppearanceBroadcastJob.perform_later
  end
end
