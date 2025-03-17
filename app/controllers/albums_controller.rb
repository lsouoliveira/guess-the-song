class AlbumsController < ApplicationController
  def index
    @albums = Album.all

    render inertia: "Albums/Index", props: {
      albums: @albums.map do
        it.as_json(
          only: %i[ id name description ],
          methods: %i[ cover_path ]
        )
      end
    }
  end
end
