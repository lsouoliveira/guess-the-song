class AddPoolSizeToGames < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :pool_size, :integer, null: false, default: 0
  end
end
