class GamesController < ApplicationController
  before_action :set_game, only: :show
  before_action :ensure_game_is_completed, only: :show

  def show
    render inertia: "Games/Show", props: {
      game: @game.as_json(
        only: %i[ id created_at status slug finished_at ],
        methods: %i[ score quiz_items_count song_segment_duration max_score ],
        include: {
          album: {
            only: %i[ id name ]
          }
        }
      )
    }
  end

  private
  def set_game
    @game = Game.find_by!(slug: params[:slug])
  end

  def ensure_game_is_completed
    return if @game.completed?

    redirect_to game_quiz_item_path(@game.slug, @game.next_item)
  end
end
