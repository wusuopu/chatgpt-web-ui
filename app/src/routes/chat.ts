import Router from "express-promise-router";
import chatController from "@/controllers/chat";

const router = Router();
export default router;

router.post('/', chatController.create);
