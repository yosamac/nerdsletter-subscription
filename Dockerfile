##################
# Public service #
##################

#
# ---- Base Node ----
FROM node:14.16.0-alpine as base

RUN apk add --no-cache tini

WORKDIR /nerdsletter

COPY package.json .
COPY package-lock.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm install --production --quiet && \
    npm cache clean -f && \
    rm -rf /tmp/npm-* && \
    # copy production node_modules aside
    cp -R node_modules prod_node_modules && \
    # install ALL node_modules, including 'devDependencies'
    npm install --quiet

#
# ---- Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=build /nerdsletter/prod_node_modules ./node_modules
# copy app sources
COPY --from=build /nerdsletter/dist .

EXPOSE 3000

# Log debugging variables
ENV LOG_LEVEL DEBUG
ENV NODE_ENV production
ENV API_PORT 3000

CMD ["tini", "node", "--optimize_for_size", "main.js"]

