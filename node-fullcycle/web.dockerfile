FROM nginx:1.18.0-alpine

RUN apk update && \
  apk add bash

RUN rm -rf /etc/nginx/conf.d/*

COPY ./app.conf /etc/nginx/conf.d/app.conf

CMD ["nginx", "-g", "daemon off;"]