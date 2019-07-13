module Gravatar
  def avatar_id
    "#{remote_ip} #{request_id} #{name}"
  end

  def avatar
    "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(avatar_id)}?d=identicon&f=y"
  end
end
