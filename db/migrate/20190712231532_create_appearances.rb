class CreateAppearances < ActiveRecord::Migration[6.0]
  def change
    create_table :appearances do |t|
      t.string :remote_ip, null: false
      t.string :request_id, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
