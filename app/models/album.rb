class Album < ApplicationRecord
  has_one_attached :cover

  has_many :album_songs, dependent: :destroy
  has_many :songs, through: :album_songs
  has_many :games, dependent: :destroy

  def cover_path
    return nil unless cover.attached?

    Rails.application.routes.url_helpers.rails_blob_path(cover, only_path: true)
  end
end
