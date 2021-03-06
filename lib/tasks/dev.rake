require "net/http"
require "uri"

user_count = 5
post_count = 10


namespace :dev do
  task fake_users: :environment do
    print "\n正在建立使用者資料"
    # User.destroy_all

    uri = URI("https://uifaces.co/api?limit=#{user_count}")
    req = Net::HTTP::Get.new(uri)

    req['X-API-KEY'] = ENV["UI_face_X_API_KEY"]
    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end
    users = JSON.parse(response.body)

    users.each do |user|
      image_url = Faker::Avatar.image(size: "50x50", format: "jpg")
      # image_url = user["photo"]
      User.create!(
        nick_name: user["email"].delete(".").split("@")[0].downcase[1..12] ,
        email: user["email"],
        password: "123456",
        description: Faker::Lorem.sentence,
        remote_avatar_url: user["photo"]             #carrierwave
      )
      # byebug
      # user.avatar.attach(io: open(image_url)  , filename: "avatar_#{user.id}.jpg")   #active storage
      print "."
    end

    puts "\n成功建立 #{User.count} 筆 使用者資料！"
    puts User.last.email
    @user_id = User.last.id
  end

  task fake_follows: :environment do
    print "\n正在建立使用者追蹤資料"
    # Follow.destroy_all

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
    # Post.destroy_all
    post_count = 10
    # User.all.each do |user|
    post_count.times do
      images = []
      rand(1..5).times do
        images << "https://picsum.photos/500/500/?random=#{rand(1000)}"
      end

      post = Post.new(
        user: User.find(@user_id),
        content: Faker::Lorem.sentence,
        remote_images_urls: images
        # body: Faker::Lorem.sentence
      )
      post.save!
      # post.taged_users = User.all.sample(rand(3..7))

      print "."
    end

    # end

    puts "\n成功建立 #{Post.count} 筆 使用者post資料！"
  end

  task fake_stories: :environment do
    print "\n正在建立使用者 story 資料"
    # Story.destroy_all

    10.times do
      num = rand(1000)
      Story.create!(
        user: User.all.sample(1).first,
        remote_picture_url: "https://picsum.photos/500/500/?random=#{num}",
      )
      print "."
    end

    puts "\n成功建立 #{Story.count} 筆 使用者story資料！"
  end

  task fake_all: :environment do
    Rake::Task["dev:fake_users"].invoke
    Rake::Task["dev:fake_follows"].invoke
    Rake::Task["dev:fake_posts"].invoke
    Rake::Task["dev:fake_stories"].invoke
  end
end
