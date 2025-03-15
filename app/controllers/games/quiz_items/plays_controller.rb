module Games
  module QuizItems
    class PlaysController < ApplicationController
      before_action :set_game, only: :create
      before_action :set_quiz_item, only: :create
      before_action :ensure_item_is_accessable

      def create
        if @quiz_item.play
          redirect_to game_quiz_item_path(@game.slug, @game.next_item)
        else
          redirect_to game_quiz_item_path(@game.slug, @game.next_item), inertia: { errors: @quiz_item.errors }
        end
      end

      private
      def set_game
        @game = Game.find_by!(slug: params[:game_slug])
      end

      def set_quiz_item
        @quiz_item = @game.quiz_items.find(params[:quiz_item_id])
      end

      def ensure_item_is_accessable
        return if @quiz_item.accessable?

        redirect_to @game
      end
    end
  end
end
