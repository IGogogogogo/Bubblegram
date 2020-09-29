class UserPolicy < ApplicationPolicy
  def show?
    true
  end

  def create?
    true
  end

  def update?
    record == user
  end

  def destroy?
    record == user
  end
end
