class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    $dummy_id ||= 0
    data['id'] = ($dummy_id += 1)
    ActionCable.server.broadcast('chat_channel', data)
  end
end
