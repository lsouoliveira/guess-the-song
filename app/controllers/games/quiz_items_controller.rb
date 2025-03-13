class Games::QuizItemsController < ApplicationController
  before_action :set_game, only: :show
  before_action :set_quiz_item, only: :show
  before_action :ensure_item_is_accessable

  def show
    render inertia: "Games/QuizItems/Show", props: {
      quiz_item: @quiz_item.as_json(
        only: %i[ id attemps status position created_at ],
        include: {
          game: {
            only: %i[ id created_at status ],
            methods: %i[ score quiz_items_count],
            include: {
              album: {
                only: %i[ id name ]
              }
            }
          }
        }
      )
    }
  end

  private
  def set_game
    @game = Game.find_by!(slug: params[:game_slug])
  end

  def set_quiz_item
    @quiz_item = @game.quiz_items.find(params[:id])
  end

  def ensure_item_is_accessable
    return if @quiz_item.accessable?

    redirect_to @game
  end
end
