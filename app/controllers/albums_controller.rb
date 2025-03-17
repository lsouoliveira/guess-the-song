class AlbumsController < ApplicationController
  before_action :set_album, only: :show

  def index
    @albums = Album.all

    render inertia: "Albums/Index", props: {
      albums: @albums.map { serialize_album(it) }
    }
  end

  def show
    render inertia: "Albums/Show", props: {
      album: serialize_album(@album)
    }
  end

  private
  def set_album
    @album = Album.find(params[:id])
  end

  def serialize_album(album)
    album.as_json(
      only: %i[ id name description ],
      methods: %i[ cover_path ]
    )
  end
end
