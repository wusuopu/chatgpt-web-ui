import { Request, Response } from 'express';
import chat from "@/utils/chat";

export default {
  async create (req: Request, res: Response) {
    try {
      const r = await chat.send(req.body.text, req.body.options)
      res.json({
        data: r,
        success: true,
      })
    } catch (error) {
      console.error('send chat error:', error)
      res.json({
        success: false,
        error: '处理出错，请稍后再试！'
      })
    }
  },
}
