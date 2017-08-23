class CreateRoutes < ActiveRecord::Migration[5.0]
  def change
    create_table :routes do |t|
      t.integer :user_id, null: false
      t.string :route, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.timestamps
    end
    add_index :routes, :route
    add_index :routes, :user_id
  end
end
