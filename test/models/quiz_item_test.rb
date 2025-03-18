require "test_helper"

class QuizItemTest < ActiveSupport::TestCase
  test "skip changes the status to skipped" do
    album = create(:album)
    song = create(:song)
    create(:album_song, album:, song: song)

    game = create(:game, pool_size: 1, album:)
    quiz_item = create(:quiz_item, game:, position: 1, status: :ongoing, song:)

    quiz_item.skip

    assert quiz_item.reload.skipped?
  end

  test "skip completes the game if there is no more pending quiz items" do
    album = create(:album)
    song = create(:song)
    create(:album_song, album:, song: song)

    game = create(:game, pool_size: 1, album:)
    quiz_item = create(:quiz_item, game:, position: 1, status: :ongoing, song:)

    quiz_item.skip

    assert game.reload.completed?
  end

  test "skip starts the next quiz item" do
    album = create(:album)
    song1 = create(:song)
    song2 = create(:song)

    create(:album_song, album:, song: song1)
    create(:album_song, album:, song: song2)

    game = create(:game, pool_size: 2, album:)
    quiz_item1 = create(:quiz_item, game:, position: 1, status: :ongoing, song: song1)
    quiz_item2 = create(:quiz_item, game:, position: 2, status: :ongoing, song: song2)

    quiz_item1.skip

    assert quiz_item2.reload.ongoing?
  end
end
