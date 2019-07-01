class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :remote_ip, null: false
      t.string :request_id, null: false
      t.string :name, null: false
      t.string :body, null: false
      t.timestamp :sent_at, null: false

      t.timestamps
    end
  end
end
