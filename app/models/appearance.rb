class Appearance < ApplicationRecord
  validates :remote_ip, presence: true
  validates :request_id, presence: true
  validates :name, presence: true
end
