class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :route_id, null: false
      t.text :body, null: false
      t.integer :commenter_id, null: false
      t.timestamps
    end
    add_index :comments, :route_id
    add_index :comments, :commenter_id
  end
end
