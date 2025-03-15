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

  def replays_available
    game.max_replays - attempts
  end

  def can_replay?
    replays_available.positive?
  end
end
