FactoryBot.define do
  factory :album_song do
    association :album
    association :song
  end
end
