class ChangeColumnType < ActiveRecord::Migration[5.0]
  def change
    change_column :routes, :route, :text
  end
end
