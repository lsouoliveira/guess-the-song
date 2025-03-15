class QuizItem < ApplicationRecord
  enum :status, %i[ not_started ongoing completed skipped ], default: :not_started

  belongs_to :game
  belongs_to :song

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
    [ plays_count - 1, 0 ].max
  end

  def replays_available
    game.max_replays - replays_count
  end

  def can_replay?
    replays_available.positive?
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

      if game.next_item?
        game.next_item.ongoing!
      else
        game.completed!
      end
    end

    true
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
