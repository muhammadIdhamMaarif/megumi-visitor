# --- Stage 1: Build the frontend ---
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies (use package-lock.json if it exists)
COPY package*.json ./

# Install deps in a clean, reproducible way
RUN npm ci --omit=dev=false || npm install

# Copy the rest of the project
COPY . .

# Build the production bundle
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:stable-alpine

# Copy built assets from the builder stage
# If your build output is `build/` instead of `dist/`, change `dist` → `build`
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) If you later add a custom nginx.conf, copy it like:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

