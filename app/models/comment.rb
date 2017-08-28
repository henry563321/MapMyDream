# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  route_id     :integer          not null
#  body         :text             not null
#  commenter_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, :commenter_id, :route_id, presence: true

  belongs_to(
    :commenter,
    class_name: 'User',
    foreign_key: :commenter_id,
  )

  belongs_to :route
end
