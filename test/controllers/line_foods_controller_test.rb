require "test_helper"

class LineFoodsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get line_foods_index_url
    assert_response :success
  end

  test "should get create" do
    get line_foods_create_url
    assert_response :success
  end
end
