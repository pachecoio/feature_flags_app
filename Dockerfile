# build environment
FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV VITE_API_URL=http://backend:8080
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]