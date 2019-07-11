class ChatChannel < ApplicationCable::Channel
  @@connections = {}

  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    @@connections.delete(connection.env['action_dispatch.request_id'])
    notify_connections
  end

  def receive(data)
    message = Message.new(
      remote_ip: connection.env['action_dispatch.remote_ip'].to_s,
      request_id: connection.env['action_dispatch.request_id'],
      name: data['name'], body: data['body'], sent_at: data['sent_at'])
    @@connections[connection.env['action_dispatch.request_id']] = message
    notify_connections
    message.save!
  end

  def notify_connections
    connections = @@connections.values.map do |message|
      { name: message.name, avatar: message.avatar }
    end
    ActionCable.server.broadcast 'chat_channel', connections: connections
  end
end
