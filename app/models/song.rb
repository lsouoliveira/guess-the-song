class Song < ApplicationRecord
  has_one_attached :audio

  def audio_path
    Rails.application.routes.url_helpers.rails_blob_path(audio, only_path: true)
  end
end
