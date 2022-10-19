FROM node:16.17.1-alpine3.15
COPY ./frontend /app
COPY ./environment/prod.frontend.env /app/.env
COPY ./.prod/builder.frontend.sh /
WORKDIR /app
RUN npm install
ENTRYPOINT ["/builder.frontend.sh"]
