FROM node:24-slim
WORKDIR /code/
ADD package.json package-lock.json /code/
RUN npm ci  
ADD . /code/
RUN npx adminforth bundle
CMD ["sh", "-c", "npm run migrate:prod && npm run prod"]
