require "net/http"
require "uri"

namespace :dev do
  task fake_users: :environment do
    print "\n正在建立使用者資料"
    User.destroy_all

    count = 10
    uri = URI("https://uifaces.co/api?limit=#{count}")
    req = Net::HTTP::Get.new(uri)

    req['X-API-KEY'] = ENV["UI_face_X_API_KEY"]
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end
    avatars = JSON.parse(response.body)

    avatars.each do |avatar|
      # image_url = Faker::Avatar.image(size: "50x50", format: "jpg")
      image_url = avatar["photo"]
      user = User.create!(
        nick_name: Faker::Name.first_name,
        email: Faker::Internet.email,
        password: "123456",
        description: Faker::Lorem.sentence,
        remote_avatar_url: image_url             #carrierwave
      )

      # user.avatar.attach(io: open(image_url)  , filename: "avatar_#{user.id}.jpg")   #active storage
      print "."
    end

    puts "\n成功建立 #{User.count} 筆 使用者資料！"
    puts User.last.email
  end

  task fake_follows: :environment do
    print "\n正在建立使用者追蹤資料"
    Follow.destroy_all

    User.all.each do |user|
      number = rand(2..5)
      @users = User.where.not(id: user.id).sample(number)
      @users.each do |u|
        Follow.create!(
          fan_id: user.id,
          following_id: u.id
        )
        print "."
      end
    end

    puts "\n成功建立 #{Follow.count} 筆 使用者追蹤資料！"
  end

  task fake_posts: :environment do
    print "\n正在建立使用者 posts 資料"
    Post.destroy_all

    User.all.each do |user|
      rand(2..5).times do
        num = rand(1000)
        post = user.posts.create!(
          remote_image_url: "https://picsum.photos/500/500/?random=#{num}",
          content: Faker::Lorem.sentence,
          # body: Faker::Lorem.sentence
        )
        print "."
        post.taged_users = User.all.sample(rand(3..7))
      end

    end

    puts "\n成功建立 #{Post.count} 筆 使用者post資料！"
  end

  task fake_all: :environment do
    Rake::Task["dev:fake_users"].invoke
    Rake::Task["dev:fake_follows"].invoke
    Rake::Task["dev:fake_posts"].invoke
  end
end
