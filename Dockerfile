# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod

# Stage 2: Serve the application from nginx
FROM nginx:alpine
COPY --from=build /app/dist/save-users-frontend/browser /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]