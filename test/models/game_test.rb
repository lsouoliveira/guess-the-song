require "test_helper"

class GameTest < ActiveSupport::TestCase
  test "validates game is valid if quiz items maximum length is pool size" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)
    song3 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)
    create(:album_song, album:, song: song3)

    game = build(:game, album:, pool_size: 2)
    game.quiz_items = [ build(:quiz_item, song: song1, position: 1) ]

    assert game.valid?
  end

  test "validates game is invalid if quiz items length bigger than is pool size" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)
    song3 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)
    create(:album_song, album:, song: song3)

    game = build(:game, album:, pool_size: 1)
    game.quiz_items = [
      build(:quiz_item, song: song1, position: 1),
      build(:quiz_item, song: song2, position: 2)
    ]

    assert_not game.valid?
  end

  test "initialize_items builds a list of quiz items based on pool size" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)
    song3 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)
    create(:album_song, album:, song: song3)

    game = create(:game, album:, pool_size: 2)
    game.initialize_items

    assert_equal 2, game.quiz_items.map(&:song_id).uniq.size
  end

  test "next_item returns nil if game is completed" do
    game = build_stubbed(:game, status: :completed)

    assert_nil game.next_item
  end

  test "next_item returns the first not started quiz item" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)
    song3 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)

    game = create(
      :game,
      album:,
      pool_size: 2,
      quiz_items: [
        build(:quiz_item, song: song1, position: 1, status: :completed),
        build(:quiz_item, song: song2, position: 2, status: :not_started)
      ]
    )

    assert 2, game.next_item.position
  end

  test "next_item returns nil when there is no not started quiz items" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)
    song3 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)

    game = create(
      :game,
      album:,
      pool_size: 2
    )

    assert_nil game.next_item
  end
end
