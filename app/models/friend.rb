class Friend < ApplicationRecord
  validates :user_id, uniqueness: { scope: :apply_user_id }
  validates :user_id, :apply_user_id, presence: true
  validates :status, inclusion: { in: ['PENDING', 'APPROVED', 'DENIED'] }

  validate :not_friend_self

  def not_friend_self
    errors.add(:apply_user_id, "can't be same with currentUser") if user_id == apply_user_id
  end

  belongs_to(
    :applier,
    class_name: 'User',
    foreign_key: :user_id,
  )

  belongs_to(
    :friends,
    class_name: 'User',
    foreign_key: :apply_user_id,
  )


end
