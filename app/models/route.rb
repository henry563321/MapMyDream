class Route < ApplicationRecord
  validates :route, :user_id, :start_time, :end_time, presence: true

  validate :ensure_time_valid

  belongs_to :user

  def ensure_time_valid
    errors.add_to_base("must be valid time") if self.start_time < self.end_time
  end
end
