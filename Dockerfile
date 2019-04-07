FROM mtlynch/jekyll

RUN apt-get update
RUN apt-get install -y socat

WORKDIR /app
COPY assets ./assets
COPY package.json .
COPY _plugins ./_plugins
COPY Gemfile .
COPY Gemfile.lock .

RUN npm install && npm run build:js
RUN bundle install

EXPOSE 4001
EXPOSE 35730

ENTRYPOINT socat tcp-listen:35730,reuseaddr,fork tcp:localhost:35729 & \
  socat tcp-listen:4001,reuseaddr,fork tcp:localhost:4000 & \
  ./_serve_dev_site
