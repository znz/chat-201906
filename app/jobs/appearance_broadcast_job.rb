class AppearanceBroadcastJob < ApplicationJob
  queue_as :default

  def perform(*args)
    ActionCable.server.broadcast 'chat_channel', appearance: Appearance.all.map(&:to_chat_hash)
  end
end
