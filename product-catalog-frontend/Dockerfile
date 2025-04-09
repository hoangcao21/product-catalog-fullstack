# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY localhost.pem /etc/nginx
COPY localhost-key.pem /etc/nginx

EXPOSE 5443

CMD ["nginx", "-g", "daemon off;"] 