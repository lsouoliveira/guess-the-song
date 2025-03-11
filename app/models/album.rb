class Album < ApplicationRecord
  has_one_attached :cover

  has_many :album_songs
  has_many :songs, through: :album_songs
end
