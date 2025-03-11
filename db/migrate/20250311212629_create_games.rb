class CreateGames < ActiveRecord::Migration[8.0]
  def change
    create_table :games do |t|
      t.string :slug, null: false
      t.integer :status, null: false, default: 0
      t.datetime :started_at

      t.timestamps
    end

    add_index :games, :slug, unique: true
  end
end
