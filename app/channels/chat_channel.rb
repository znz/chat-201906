class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    Message.create!(
      remote_ip: connection.env['action_dispatch.remote_ip'].to_s,
      request_id: connection.env['action_dispatch.request_id'],
      name: data['name'], body: data['body'], sent_at: data['sent_at'])
  end
end
