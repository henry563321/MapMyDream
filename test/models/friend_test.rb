# == Schema Information
#
# Table name: friends
#
#  id            :integer          not null, primary key
#  apply_user_id :integer          not null
#  user_id       :integer          not null
#  status        :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class FriendTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
