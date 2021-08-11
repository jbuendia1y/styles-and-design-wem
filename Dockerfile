FROM nginx:1.20-alpine as wem

RUN apk update
RUN apk add vim