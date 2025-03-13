class GamesController < ApplicationController
  before_action :set_game, only: :show
  before_action :ensure_game_is_completed, only: :show

  def show
    render inertia: "Games/Show"
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
