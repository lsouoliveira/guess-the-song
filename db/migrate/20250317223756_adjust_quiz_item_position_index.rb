class AdjustQuizItemPositionIndex < ActiveRecord::Migration[8.0]
  def change
    change_table :quiz_items do |t|
      t.remove_index :position
      t.index %i[game_id position], unique: true
    end
  end
end
