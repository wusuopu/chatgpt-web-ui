import chat from "@/utils/chat";
import wechat from 'wechat';
import Config from '@/config';


const handleText = async ( text, req, res, next ) => {
  // 消息类型： https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453
  // 设置一般回复
  try {
    const r = await chat.send(text)
    res.reply(r.text)
  } catch (error) {
    res.reply('处理出错，请稍后再试！')
  }
}
const ignoreMessage = (message, req, res, next) => {
  // 忽略公众号中接收到的消息
  res.send('')
}
const notify = wechat({
  appid: Config.WECHAT_APP_ID,
  token: Config.WECHAT_TOKEN,
  encodingAESKey: Config.WECHAT_ENCODING_AES_KEY,
  checkSignature: Config.WECHAT_CHECK_SIGNATURE,
}).text(handleText)
  .image(ignoreMessage)   // 忽略图片、语音、视频的消息
  .voice(ignoreMessage)
  .video(ignoreMessage)
  .middlewarify()

export default {
  create: notify,
}
