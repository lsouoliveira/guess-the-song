class AddFinishedAtToGames < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :finished_at, :datetime
  end
end
