# Bubblegram
![](https://i.imgur.com/opckvca.png)

**Demo: https://bubble-gram.com**

---

## 目錄
* [專案目的](#專案目的)
* [User Story](#User-Story)
* [專案初始化](#專案初始化)
* [使用技術](#使用技術)
* [開發團隊](#開發團隊)

## 專案目的
> Bubblegram 是一個向知名社群軟體 Instagram 致敬的產品。提供了清新的使用介面，使用者可以隨時隨地與朋友分享每一個精彩時刻。Bubblegram 跳脫了文字框架，使用者不僅可以上傳照片分享生活趣事，更可以透過直播與世界對話。

## 使用技術
- 前端：HTML、CSS、JavaScript、jQuery、Stimulus js、Bootstrap
- 後端：Ruby on Rails
- 專案部署：AWS EC2、Passenger、Nginx、gcp


## User Story

### 使用者系統
1. 註冊
    *  輸入暱稱，信箱，密碼註冊
    *  第三方登入(facebook, google)
    *  訪客註冊(由系統自動產生暱稱，信箱，密碼)

2. 編輯
    * 更換大頭照
    * 編輯暱稱
    * 編輯信箱

3. 搜尋
可以在搜尋頁面輸入關鍵字搜尋 user 暱稱或信箱

4. 追蹤
可以在搜尋頁面或是對方個人頁面追蹤/取消追蹤對方

### 即時聊天系統
* 收到聊天訊息會有未讀通知
* 1 對 1 聊天室可以發送即時訊息
* 1 對 1 聊天室可以發送即時圖片


![](https://i.imgur.com/90o5d9H.png)



### 貼文系統
1. 瀏覽貼文
    * 在首頁可以瀏覽已追蹤 user 的貼文
    * 在個人頁面可以瀏覽個人貼文和被標記的貼文
    * 在搜尋頁面可以瀏覽精選貼文
    * 下滑到底部可以載入更多貼文


2. 新增貼文
    * 可以上傳最多 5 張照片
    * 可以加入內文
    * 可以標記有追蹤的 user

3. 編輯貼文
    * 可以修改內文
    * 可以修改標記的 user

4. 刪除貼文

### 限時動態系統
1. 瀏覽限時動態
可以看到已追蹤 user 24 小時內新增的限時動態


2. 新增限時動態
選擇一張照片後可以新增限時動態

![](https://i.imgur.com/Dzre36K.png)


### 直播系統
1. 觀看直播
    * 已追蹤 user 在直播時，限時動態連結會出現直撥中提示
    * 在直播頁面可以即時留言
    * 在直播頁面可以按愛心

2. 開啟直播
點最下方『＋』的選擇錄影機 icon 可以開啟直播

**直播系統DEMO照：**
![](https://i.imgur.com/QjSGa1D.png)


---

## 專案初始化

### install project
 1. Fork專案
 2. bundle 和資料庫遷移
```
bundle install
rails db:migrate
```

### 安裝 redis
```
brew update
brew install redis
```

### 安裝 imagemagick
```
brew install imagemagick
```

### api key 設定
1. figaro gem setup
```
bundle exec figaro install
```
取得下方 api key，再把 key 貼到 application.yml

2. 申請 vonage api key(直播功能)
https://www.vonage.com.tw/

3. 申請 fb/google api key (第三方登入)
    - [Facebook for Developers](https://developers.facebook.com/)
    - [Google API Console](https://console.developers.google.com/)

4. 申請 UI face api key(user 假資料)
https://uifaces.co/api-key

---

## 使用技術

**後端**：
* Ruby 2.6.5
* Rails 6.0

**前端**：
* Stimulus 
* jQuery 
* Ajax 
* Webpack 
* Bootstrap 
* Owl Carousel

**版本控制**：
* Git
* GitHub

**部署**：
* AWS EC2
* Nginx 
* Passenger

**資料庫 / 雲端存取服務**：
* PostgreSQL 
* AWS S3
* Redis

**第三方 api**： 
* Vonage Video API
* Facebook : [OmniAuth Facebook](https://github.com/simi/omniauth-facebook)
* Google : [omniauth-google-oauth2](https://github.com/zquestz/omniauth-google-oauth2)

**其他**：
* Rails Action Cable

---

## 開發團隊

### 元瑀
- GitHub: [gn2481](https://github.com/gn2481)
- E-mail: gn2481@gmail.com

### 紹軒
- GitHub: [dsfwoo](https://github.com/dsfwoo)
- E-mail: jerry19920702@gmail.com

### 泇吟
- GitHub: [chiayinin](https://github.com/chiayinin)
- E-mail: chiayinin@gmail.com
- Resume: https://www.cakeresume.com/flax_gorge

### 岳峰
- GitHub: [besquevans](https://github.com/besquevans)
- E-mail: du20783@gmail.com
- Resume: https://www.cakeresume.com/du20783

### 彥緯
- GitHub: [wye139629](https://github.com/wye139629)
- E-mail: wye139629@gmail.com

