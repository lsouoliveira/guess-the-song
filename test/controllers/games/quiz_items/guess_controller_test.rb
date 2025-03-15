require "test_helper"

class Games::QuizItems::GuessControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get games_quiz_items_guess_create_url
    assert_response :success
  end
end
