class ChatChannel < ApplicationCable::Channel
  @@appearance = {}

  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    delete_appearance(connection.env['action_dispatch.request_id'])
  end

  def receive(data)
    message = Message.new(
      remote_ip: connection.env['action_dispatch.remote_ip'].to_s,
      request_id: connection.env['action_dispatch.request_id'],
      name: data['name'], body: data['body'], sent_at: data['sent_at'])
    add_appearance(message.request_id, message.name, message.avatar)
    message.save!
  end

  private

  def add_appearance(request_id, name, avatar)
    @@appearance[request_id] = {
      name: name,
      avatar: avatar,
    }
    notify_appearance
  end

  def delete_appearance(request_id)
    @@appearance.delete(request_id)
    notify_appearance
  end

  def notify_appearance
    ActionCable.server.broadcast 'chat_channel', appearance: @@appearance.values
  end
end
