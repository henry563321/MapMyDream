class Route < ApplicationRecord
  validates :route, :user_id, :start_time, :end_time, presence: true

  validate :ensure_time_valid

  belongs_to :user

  def ensure_time_valid
    if (start_time <=> end_time) == 1
      errors.add(:end_time, "can't be smaller than start_time")
    end
  end
end
