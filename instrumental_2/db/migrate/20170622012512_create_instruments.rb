class CreateInstruments < ActiveRecord::Migration
  def change
    create_table :instruments do |t|
      t.string :kind
      t.string :model
      t.integer :price
      t.integer :customer_id

      t.timestamps null: false
    end
  end
end
