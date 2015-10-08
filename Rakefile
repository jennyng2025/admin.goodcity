# This Rakefile assists in creating Cordova app builds. It provides a consistent
# build process on dev machines, CI servers and is cross-platform.
#
# Tasks overview
#   rake app:build (default)
#   rake app:deploy (upload to TestFairy)
#   rake app:release (build and upload to TestFairy)
#
# Defaults:
#   ENV=staging PLATFORM=<based on host machine: darwin -> ios, linux -> android>
#
# Advanced usage
#   Specify ENVIRONMENT params or call special task
#     > rake android production app:build
#     > ENV=production PLATFORM=android rake app:build (equivalant to above)
#   Other tasks
#     > rake clean (removes dist, cordova/www and app files)
#     > rake clobber (also removes cordova/platforms and cordova/plugins)
#     > rake ember:install (multitask that does bower and npm in parallel)
#     > rake ember:build
#     > rake cordova:install
#     > rake cordova:prepare
#     > rake cordova:build
#     > rake testfairy:upload
#     > rake ios_build_server:notify (tells the iOS server to start a build)

require 'json'
require 'rexml/document'
require "rake/clean"
ROOT_PATH = File.dirname(__FILE__)
CORDOVA_PATH = "#{ROOT_PATH}/cordova"
CLEAN.include("dist", "cordova/www", "#{CORDOVA_PATH}/platforms/android/build",
  "#{CORDOVA_PATH}/platforms/ios/build")
CLOBBER.include("cordova/platforms", "cordova/plugins")
PLATFORMS = %w(android ios windows).freeze
ENVIRONMENTS = %w(staging production).freeze
CONFIG_XML_PATH = "#{CORDOVA_PATH}/config.xml"
EMBER = "#{ROOT_PATH}/node_modules/ember-cli/bin/ember"

# Default task
task default: %w(app:build)

# Main namespace
namespace :app do
  desc "Builds the app"
  task build: %w(ember:install ember:build cordova:install cordova:prepare cordova:build)
  desc "Uploads the app to TestFairy"
  task deploy: %w(testfairy:upload)
  desc "Equivalent to rake app:build app:deploy"
  task release: %w(app:build testfairy:upload)
end

ENVIRONMENTS.each do |env|
  task env do
    ENV["ENV"] = env
  end
end

PLATFORMS.each do |platform|
  task platform do
    ENV["PLATFORM"] = platform
  end
end

namespace :ember do
  desc "Ember install dependencies"
  multitask install: %w(bower_install npm_install)
  task :bower_install do
    sh %{ bower install }
  end
  task :npm_install do
    sh %{ npm install }
  end
  desc "Ember build with Cordova enabled"
  task :build do
    sh %{ EMBER_CLI_CORDOVA=1 APP_SHA=#{app_sha} STAGING=#{is_staging} #{EMBER} build --environment=production }
  end
end

namespace :cordova do
  desc "Install cordova package globally"
  task :install do
    sh %{ npm list --depth 1 --global cordova; if [ $? -ne 0 ]; then npm install -g cordova; fi }
  end
  desc "Cordova prepare {platform}"
  task :prepare do
    sh %{ ln -s "#{ROOT_PATH}/dist" "#{CORDOVA_PATH}/www" } unless File.exists?("#{CORDOVA_PATH}/www")
    sh %{ cd #{CORDOVA_PATH}; cordova prepare #{platform} }
  end
  desc "Cordova build {platform}"
  task :build do
    Rake::Task["cordova:bump_version"].invoke if ENV["CI"]
    sh %{ STAGING=#{is_staging} #{EMBER} cordova:build --platform #{platform} --environment=production }
    if platform == "ios"
      sh %{ cordova build ios --device }
      sh %{ xcrun -sdk iphoneos PackageApplication '#{app_file}' -o '#{ipa_file}' }
    end
  end
  task :bump_version do
    increment_app_version!
    sh %{ git config --global user.email "none@none" }
    sh %{ git config --global user.name "CircleCi" }
    sh %{ git config --global push.default current }
    sh %{ git add #{CONFIG_XML_PATH} }
    sh %{ git commit -m "Update build version [ci skip]" }
    sh %{ git push }
  end
end

namespace :testfairy do
  task :upload do
    raise "#{app_file} does not exist!" unless File.exists?(app_file)
    raise "TESTFAIRY_API_KEY not set." unless env?("TESTFAIRY_API_KEY")
    sh %{ #{testfairy_upload_script} #{app_file} }
  end
end

def env?(env)
  (ENV[env] || "") != ""
end

namespace :ios_build_server do
  desc "Sends a message to the iOS build server to begin building an app"
  task :notify do
    %w(GOODCITY_IRON_MQ_OAUTH_KEY GOODCITY_IRON_MQ_PROJECT_KEY
      GOODCITY_IRON_MQ_QUEUE_NAME TESTFAIRY_API_KEY).each do |env|
        raise "#{env} not set." unless env?(env)
    end
    auth_header = "Authorization: OAuth #{ENV['GOODCITY_IRON_MQ_OAUTH_KEY']}"
    content_type_header = "Content-Type: application/json"
    build_message = {messages: [ { body: "build #{app_url}" } ]}.to_json
    url = "https://mq-aws-us-east-1.iron.io/1/projects/#{ENV['GOODCITY_IRON_MQ_PROJECT_KEY']}/queues/#{ENV['GOODCITY_IRON_MQ_QUEUE_NAME']}/messages"
    sh %{ curl -H '#{content_type_header}' -H '#{auth_header}' -d '#{build_message}' #{url} }
    puts
  end

  desc "Checks to see if we should begin a build"
  task :check do
    # body: message: "build hk.goodcity.adminstaging"
    # body: message: "build hk.goodcity.admin"
    # body: message: "build hk.goodcity.appstaging"
    # body: message: "build hk.goodcity.app"
  end
  task :build do

  end
end

def app_sha
  `git rev-parse --short HEAD`.chomp
end

def environment
  environment = ENV["ENV"]
  raise "Unsupported environment: #{environment}" if (environment || "").length > 0 and !ENVIRONMENTS.include?(environment)
  ENV["ENV"] || "staging"
end

def platform
  env_platform = ENV["PLATFORM"]
  raise "Unsupported platform: #{env_platform}" if (env_platform || "").length > 0 and !PLATFORMS.include?(env_platform)
  env_platform || begin
    case Gem::Platform.local.os
    when /mswin|windows/i
      "windows"
    when /linux|arch/i
      "android"
    when /darwin/i
      "ios"
    else
      raise "Unsupported build os: #{os}"
    end
  end
end

def app_file
  case platform
  when /ios/
    "#{CORDOVA_PATH}/platforms/ios/build/device/#{app_name}.ipa"
  when /android/
    "#{CORDOVA_PATH}/platforms/android/build/outputs/apk/android-release-unsigned.apk"
  when /windows/
    raise "TODO: Need to get Windows app path"
  end
end

def ipa_file
  "#{CORDOVA_PATH}/platforms/ios/build/device/#{app_name}.ipa"
end

def app_name
  app_details["name"]
end

def app_url
  app_details["url"]
end

def app_details
  @app_details ||= JSON.parse(File.read("#{CORDOVA_PATH}/appDetails.json"))
  @app_details[environment]
end

def increment_app_version!
  version_array = config_xml.elements["widget"].attributes["version"].split(".")
  new_version = (version_array[0..1] << version_array.last.to_i + 1).join(".")
  config_xml.elements["widget"].attributes["version"] = new_version
  File.open(CONFIG_XML_PATH, "w"){|f| f.puts config_xml}
end

def config_xml
  # Run cordova hooks to set app name first
  # invoke will ensure task is only called if it hasn't already run
  Rake::Task["cordova:prepare"].invoke
  REXML::Document.new(File.read(CONFIG_XML_PATH))
end

def testfairy_upload_script
  "#{CORDOVA_PATH}/deploy/testfairy-#{platform}-upload.sh"
end

def is_staging
  (environment == "staging").to_s
end