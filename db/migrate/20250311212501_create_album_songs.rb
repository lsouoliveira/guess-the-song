class CreateAlbumSongs < ActiveRecord::Migration[8.0]
  def change
    create_table :album_songs do |t|
      t.references :album, null: false, foreign_key: true
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
