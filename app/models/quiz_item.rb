class QuizItem < ApplicationRecord
  enum :status, %i[ not_started ongoing completed skipped ], default: :not_started

  belongs_to :game
  belongs_to :song

  validates :position, presence: true, uniqueness: { scope: :game_id }
  validates :status, presence: true
  validates :plays_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :song, presence: true
  validates :game, presence: true

  scope :ordered, -> { order(:position) }
  scope :ongoing, -> { where(status: :ongoing) }
  scope :not_started, -> { where(status: :not_started) }
  scope :pending, -> { not_started.or(ongoing) }

  def accessable?
    game.completed? ||
    completed? ||
    skipped? ||
    current_item?
  end

  def current_item?
    game.next_item == self
  end

  def replays_count
    [ plays_count - increments_count - 1, 0 ].max
  end

  def replays_available
    game.max_replays - replays_count
  end

  def increments_available
    game.max_increments - increments_count
  end

  def can_replay?
    replays_available.positive?
  end

  def next_item_id
    return nil unless next_item?

    next_item.id
  end

  def previous_item_id
    return nil unless previous_item?

    previous_item.id
  end

  def next_item
    game.quiz_items.find_by(position: position + 1)
  end

  def next_item?
    next_item.present?
  end

  def previous_item
    game.quiz_items.find_by(position: position - 1)
  end

  def previous_item?
    previous_item.present?
  end

  def play
    if plays_count.positive? && !can_replay?
      errors.add(:plays_count, :no_replays_available)
      return false
    end

    increment! :plays_count

    true
  end

  def guess(song_name)
    return unless validate_guess(song_name)

    transaction do
      completed!
      game.set_next_item_or_complete!
    end

    true
  end

  def increment_duration
    if increments_count >= game.max_increments
      errors.add(:increments_count, :no_increments_available)
      return false
    end

    increment! :increments_count
    increment! :plays_count
  end

  def skip
    transaction do
      skipped!
      game.set_next_item_or_complete!
    end
  end

  private
  def validate_guess(song_name)
    return true if sanitize_guess(song.name) == sanitize_guess(song_name)

    errors.add(:song, :wrong_guess)
    false
  end

  def sanitize_guess(song_name)
    song_name.to_s.downcase.gsub(/[^a-zA-Z0-9 ]/, "")
  end
end
