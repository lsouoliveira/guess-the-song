class QuizItem < ApplicationRecord
  enum status: %i[ not_started ongoing completed skipped ], default: :not_started

  belongs_to :game
  belongs_to :song
end
