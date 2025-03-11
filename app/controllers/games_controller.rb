class GamesController < ApplicationController
  def show
    render inertia: 'Games/Show'
  end
end
