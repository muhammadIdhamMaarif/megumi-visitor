# ============================
# 1) Build stage (Node + Vite)
# ============================
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install dependencies (uses package-lock.json if present)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the production-ready static files (Vite -> dist/)
RUN npm run build


# ============================
# 2) Run stage (Nginx)
# ============================
FROM nginx:alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional but nice) Set a default Nginx config for a simple static site
# If you don't have custom routing, the default is fine and you can skip this.
# Uncomment and create nginx.conf if you need advanced config.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 inside the container
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
