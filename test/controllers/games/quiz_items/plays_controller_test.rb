require "test_helper"

class Games::QuizItems::PlaysControllerTest < ActionDispatch::IntegrationTest
  test "increments quiz item plays count" do
    album = create(:album)
    song = create(:song)

    create(:album_song, album:, song:)
    game = create(:game, album:, pool_size: 1)
    quiz_item = create(:quiz_item, game:, song:, position: 1, plays_count: 0)

    assert_difference "QuizItem.last.plays_count", +1 do
      post game_quiz_item_play_path(game.slug, quiz_item)
    end
  end
end
