class AddStartsAtToSongs < ActiveRecord::Migration[8.0]
  def change
    add_column :songs, :starts_at, :integer, null: false, default: 0
  end
end
