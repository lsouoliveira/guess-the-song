class AddAlbumRefToGames < ActiveRecord::Migration[8.0]
  def change
    add_reference :games, :album, null: false, foreign_key: true
  end
end
