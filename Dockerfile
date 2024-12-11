FROM node:20-alpine3.20 AS base-image

ENV DIR=/app

WORKDIR $DIR

FROM base-image AS deps

COPY --chown=node:node package*.json $DIR

COPY --chown=node:node . $DIR

RUN npm ci

FROM base-image AS builder

COPY --chown=node:node --from=deps $DIR/node_modules $DIR/node_modules

COPY --chown=node:node . $DIR

RUN npm run build

FROM base-image AS production

ENV NODE_ENV=production

COPY --chown=node:node package.json $DIR

COPY --chown=node:node --from=builder $DIR/node_modules $DIR/node_modules

COPY --chown=node:node --from=builder $DIR/public $DIR/public

COPY --chown=node:node --from=builder $DIR/.next $DIR/.next

COPY --chown=node:node --from=builder $DIR/.next/static $DIR/.next/static

CMD ["npm", "start"]

