class CreateAppearances < ActiveRecord::Migration[6.0]
  def change
    create_table :appearances do |t|
      t.string :remote_ip
      t.string :request_id
      t.string :name

      t.timestamps
    end
  end
end
