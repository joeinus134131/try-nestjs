# Building layer
FROM node:18-alpine

# Optional NPM automation (auth) token build argument
# ARG NPM_TOKEN

# Optionally authenticate NPM registry
# RUN npm set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

# WORKDIR /sr/src/app
WORKDIR /usr/src/app

# Copy configuration files
# COPY tsconfig*.json .
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
# RUN npm install
RUN npm install --legacy-peer-deps

# Copy application sources (.ts, .tsx, js)
# COPY src/ src/
COPY . .

# Build application (produces dist/ folder)
RUN npm run build

# Expose application port
EXPOSE 3001

# Start application
CMD [ "node", "dist/src/main.js" ]
# CMD [ "npm", "run", "start:dev" ]