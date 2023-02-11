// 微信消息
import Router from "express-promise-router";
import wechatController from "@/controllers/wechat";

const router = Router();
export default router;

router.post('/', wechatController.create);
router.get('/', wechatController.create);
