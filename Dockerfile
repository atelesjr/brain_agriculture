FROM node:24.11.1-alpine

WORKDIR /app

# Copy package files and install only production dependencies
# json-server is a dependency in package.json so it will be installed
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy only the server data needed for json-server
COPY server ./server

EXPOSE 3000

# Start json-server using the npm script and honor PORT if provided by the host
# Avoid using `npx` at runtime to reduce supply-chain surface
## Create a non-root user and ensure ownership of the app directory
RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /app

# Switch to non-root user for runtime
USER app

CMD ["sh", "-c", "npm run server -- --port ${PORT:-3000}"]
