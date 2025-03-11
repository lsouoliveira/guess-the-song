class Game < ApplicationRecord
  before_validation :set_slug, on: :create

  private
  def set_slug
    return if slug.present?

    self.slug = SecureRandom.alphanumeric(12)
  end
end
