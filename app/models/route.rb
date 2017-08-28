# == Schema Information
#
# Table name: routes
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  route      :string           not null
#  start_time :datetime         not null
#  end_time   :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Route < ApplicationRecord
  validates :route, :user_id, :start_time, :end_time, presence: true

  validate :ensure_time_valid

  belongs_to :user

  has_many :comments

  def ensure_time_valid
    if (start_time <=> end_time) == 1
      errors.add(:end_time, "can't be smaller than start_time")
    end
  end
end
