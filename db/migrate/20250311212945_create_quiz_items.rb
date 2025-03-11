class CreateQuizItems < ActiveRecord::Migration[8.0]
  def change
    create_table :quiz_items do |t|
      t.integer :attempts, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.integer :position, null: false
      t.references :game, null: false, foreign_key: true
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end

    add_index :quiz_items, :position, unique: true
  end
end
