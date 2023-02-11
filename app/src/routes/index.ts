import express from 'express';
import * as health from '../controllers/health';
import chatRoute from "./chat";
import wechatRoute from "./wechat";

export default {
  init (app: express.Application) {
    app.get('/_health', health.check);
    app.use('/wechat', wechatRoute);
    app.use('/api/v1/chat', chatRoute)
  },
}
