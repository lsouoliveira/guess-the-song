class AddIncrementsCountToQuizItems < ActiveRecord::Migration[8.0]
  def change
    add_column :quiz_items, :increments_count, :integer, null: false, default: 0
  end
end
