require "test_helper"

class QuizItems::ReplaysControllerTest < ActionDispatch::IntegrationTest
  test "increments quiz item attemps count" do
    album = create(:album)
    song = create(:song)

    create(:album_song, album:, song:)
    game = create(:game, album:, pool_size: 1)
    quiz_item = create(:quiz_item, game:, song:, position: 1, attempts: 0)

    assert_difference "QuizItem.last.attempts", +1 do
      post game_quiz_item_replay_path(game.slug, quiz_item)
    end
  end

  test "does not increment quiz item attemps count if there is no more replays available" do
    album = create(:album)
    song = create(:song)

    create(:album_song, album:, song:)
    game = create(:game, album:, pool_size: 1)
    quiz_item = create(:quiz_item, game:, song:, position: 1, attempts: game.max_replays)

    assert_no_difference "QuizItem.last.attempts" do
      post game_quiz_item_replay_path(game.slug, quiz_item)
    end
  end
end
