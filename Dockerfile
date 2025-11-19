FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy repo files
COPY . .

EXPOSE 10000

# Start json-server using Render's $PORT or fallback to 10000
CMD ["sh", "-c", "npx json-server --watch server/db.json --host 0.0.0.0 --port ${PORT:-10000}"]
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production || npm install --production

# Copy only the server data needed for json-server
COPY server ./server

EXPOSE 3000

# Start json-server on the provided PORT (if set by the host) or 3000
CMD ["sh","-c","npx json-server --host 0.0.0.0 --port ${PORT:-3000} --watch server/db.json"]
