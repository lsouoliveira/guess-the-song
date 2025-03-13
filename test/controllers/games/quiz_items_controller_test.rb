require "test_helper"

class Games::QuizItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get games_quiz_items_show_url
    assert_response :success
  end
end
