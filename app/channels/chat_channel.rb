class ChatChannel < ApplicationCable::Channel
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
    Appearance.where(request_id: message.request_id).first_or_create do |appearance|
      appearance.remote_ip = message.remote_ip
      appearance.name = message.name
    end
    message.save!
  end
end
