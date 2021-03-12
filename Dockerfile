FROM node:10.19 as builder

RUN apt-get update \
&& apt-get install -y apt-utils \
&& apt-get install -y apt-transport-https \
&& apt-get install -y nginx


RUN mkdir /front
WORKDIR /front

COPY angular.json package.json tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn run build


FROM nginx:1.15-alpine

COPY --from=builder /front/dist/rms /usr/share/nginx/html
COPY ./vhosts.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/sites-enabled/default

CMD sed -i -e 's@__APIKEY@'"$API_KEY"'@g' /usr/share/nginx/html/*.js \
&& nginx -g "daemon off;"
