class Game < ApplicationRecord
  MAX_SCORE_BY_ITEM = 100
  REPLAY_PENALTY = -20
  INCREMENT_PENALTY = -30
  ATTEMPT_PENALTY = -10
  DIFFICULTY_CONFIG = {
    easy: {
      song_segment_duration: 5,
      max_replays: 2,
      max_increments: 2
    },
    medium: {
      song_segment_duration: 3,
      max_replays: 2,
      max_increments: 2
    },
    hard: {
      song_segment_duration: 1,
      max_replays: 2,
      max_increments: 2
    }
  }.freeze

  enum :status, %i[ ongoing completed ], default: :ongoing
  enum :difficulty, %i[ easy medium hard ], default: :easy

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

  def next_item?
    next_item.present?
  end

  def quiz_items_count
    quiz_items.count
  end

  def score
    scope = ongoing? ? quiz_items.where.not(status: :skipped) : quiz_items.completed
    scope.sum { score_for(it).clamp(0, MAX_SCORE_BY_ITEM) }
  end

  def max_score
    MAX_SCORE_BY_ITEM * quiz_items.count
  end

  def song_segment_duration
    difficulty_config[:song_segment_duration]
  end

  def max_replays
    difficulty_config[:max_replays]
  end

  def max_increments
    difficulty_config[:max_increments]
  end

  def difficulty_config
    DIFFICULTY_CONFIG[difficulty.to_sym]
  end

  def complete!
    transaction do
      completed!
      update!(finished_at: Time.zone.now)
    end
  end

  def set_next_item_or_complete!
    if next_item?
      next_item.ongoing!
    else
      complete!
    end
  end

  def score_for(quiz_item)
    MAX_SCORE_BY_ITEM + quiz_item.replays_count * REPLAY_PENALTY +
      quiz_item.increments_count * INCREMENT_PENALTY +
      quiz_item.attempts * ATTEMPT_PENALTY
  end

  private
  def set_slug
    return if slug.present?

    self.slug = SecureRandom.alphanumeric(12)
  end
end
