module Albums
  class GamesController < ApplicationController
    before_action :set_album, only: :create

    def create
      @game = @album.games.build(game_params.merge(pool_size: 10))
      @game.initialize_items

      if @game.save
        redirect_to game_path(@game.slug)
      else
        redirect_to album_path(@album)
      end
    end

    private
    def set_album
      @album = Album.find(params[:album_id])
    end

    def game_params
      params.require(:game).permit(:difficulty)
    end
  end
end
