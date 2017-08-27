class CreateFriends < ActiveRecord::Migration[5.0]
  def change
    create_table :friends do |t|
      t.integer :apply_user_id, null: false
      t.integer :user_id, null: false
      t.string :status, null: false
      t.timestamps
    end
    add_index :friends, [:apply_user_id, :user_id], unique: true
    add_index :friends, :user_id
  end
end
