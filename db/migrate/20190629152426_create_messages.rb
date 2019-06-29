class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :name
      t.string :body
      t.timestamp :sent_at

      t.timestamps
    end
  end
end
