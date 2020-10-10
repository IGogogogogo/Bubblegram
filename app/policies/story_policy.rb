class StoryPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    record.user == user
  end

  def destroy?
    record.user == user
  end
end
