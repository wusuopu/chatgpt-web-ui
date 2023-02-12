FROM node:18.12.1-alpine3.16

COPY ./app/package.json ./app/yarn.lock /app/
RUN cd /app && yarn install && rm -rf /root/.cache /root/.npm /usr/local/share/.cache/yarn/

COPY ./app/ /app
WORKDIR /app

RUN yarn build


ENV NODE_ENV=production \
    PORT=80 \
    MOCK_API=false \
    OPENAI_API_KEY= \
    OPENAI_MODEL=text-davinci-003 \
    WECHAT_APP_ID= \
    WECHAT_APP_SECRET= \
    WECHAT_TOKEN= \
    WECHAT_ENCODING_AES_KEY= \
    WECHAT_CHECK_SIGNATURE=true


CMD ["yarn", "start"]
