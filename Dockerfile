# first stage
# docker hub > node
FROM node:23 AS builder

ARG COMPILE_DIR=/comp

WORKDIR ${COMPILE_DIR}

# install angular cli
RUN npm i -g @angular/cli

# copy sources into container
COPY angular.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.app.json .
COPY tsconfig.spec.json .
COPY tsconfig.json .
COPY public public
COPY src src

# copy Caddyfile inside the builder container
COPY src/webapp/Caddyfile .

# install packages from package.json > node_modules
RUN npm ci 


# build angular app - gets dist/day32_inclass
RUN ng build

# copy angular to caddy
# docker hub > caddy
FROM caddy:2-alpine

LABEL maintainer="lia"

# second stage
ARG WORK_DIR=/app

WORKDIR ${WORK_DIR}

# copy angular artifacts and caddyfile from builder
COPY --from=builder /comp/src/webapp/browser browser
COPY --from=builder /comp/src/webapp/Caddyfile Caddyfile

ENV SERVER_PORT=8080

EXPOSE ${SERVER_PORT}

SHELL [ "/bin/sh", "-c"]

ENTRYPOINT SERVER_PORT=${SERVER_PORT} caddy run --config ./Caddyfile