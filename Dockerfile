FROM node:18 AS builder

WORKDIR /moana-healthcare-frontend
ARG NEXT_PUBLIC_BACKEND_URL
COPY package.json package-lock.json ./
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
# Install project dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM nginx:alpine

# Copy the build output from the previous stage to the NGINX web server directory
COPY --from=builder /moana-healthcare-frontend/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]