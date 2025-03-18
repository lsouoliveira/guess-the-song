class AddDifficultyToGames < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :difficulty, :integer, null: false, default: 0
  end
end
