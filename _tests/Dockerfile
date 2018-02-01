FROM docker.io/node:8-stretch

# Speed up installation of html-proofer.
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES true

# Install Ruby.
RUN \
  apt-get update && \
  apt-get install -y ruby ruby-dev

# Install bundler.
RUN \
  gem install bundler

WORKDIR /app
