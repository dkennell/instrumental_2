class CreateInstruments < ActiveRecord::Migration
  def change
    create_table :instruments do |t|
      t.string :type
      t.string :model
      t.integer :price
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
