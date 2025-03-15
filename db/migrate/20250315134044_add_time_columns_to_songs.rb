class AddTimeColumnsToSongs < ActiveRecord::Migration[8.0]
  def change
    add_column :songs, :start_time, :integer, null: false, default: 0
    add_column :songs, :duration, :integer, null: false, default: 0
  end
end
