source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.2'
gem 'rails-i18n', '~> 6.0.0'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 4.1'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

gem 'carrierwave', '~> 2.1'
# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Create Member system
gem 'devise', '~> 4.2'
gem 'omniauth', '~> 1.9', '>= 1.9.1'
gem 'omniauth-facebook', '~> 7.0'
gem 'omniauth-google-oauth2', '~> 0.8.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false
gem 'figaro', '~> 1.0'
gem 'kaminari', '~> 1.2', '>= 1.2.1'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'faker', '~> 2.13'
  gem 'thor', '~> 0.19.1'
  gem 'foreman', '~> 0.87.2'
  gem 'figaro'
  gem 'capistrano', '3.14.1', require: false
  gem 'capistrano-bundler', '2.0.1'
  gem 'capistrano-rails', '1.6.1'
  gem 'capistrano-passenger', '0.2.0'
  gem 'net-ssh', '~> 6.1'
  gem 'ed25519', '~> 1.2', '>= 1.2.4'
  gem 'bcrypt_pbkdf', '~> 1.0', '>= 1.0.1'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'hirb', '~> 0.7.3'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
