class Game < ApplicationRecord
  enum :status, %i[ ongoing completed ], default: :ongoing

  belongs_to :album

  has_many :quiz_items, dependent: :destroy

  before_validation :set_slug, on: :create

  validates :quiz_items, length: { maximum: ->(game) { game.pool_size } }

  def initialize_items
    song_ids = album.songs.ids.shuffle.take(pool_size)

    song_ids.each_with_index do |song_id, index|
      quiz_items.build(song_id:, position: index + 1)
    end

    quiz_items.first&.status = :ongoing
  end

  def next_item
    return nil if completed?

    quiz_items.ordered.pending.first
  end

  def quiz_items_count
    quiz_items.count
  end

  def score
    500
  end

  private
  def set_slug
    return if slug.present?

    self.slug = SecureRandom.alphanumeric(12)
  end
end
