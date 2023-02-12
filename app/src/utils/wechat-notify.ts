import { WebAPI } from 'wechat-api-next'
import logger from "@/utils/logger";
import config from "@/config";

const TOKEN_TTL = 60 * 90   // token 有效期为1个半小时
let webApp

class WebMessageApi {
  root: MyWebApi

  constructor(root) {
    this.root = root
  }
  // 发送客服消息 https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
  async send (openId: string, msgtype: string, data: any) {
    const token = await this.root.getToken()
    const options = { touser: openId, msgtype, ...data, }
    logger.debug(`web send message: ${JSON.stringify({options})}`)
    const res = await this.root.request.post('/cgi-bin/message/custom/send?access_token=' + token, options)

    return res.isSuccess()
  }
}
class MyWebApi extends WebAPI {
  message = new WebMessageApi(this)
}

// =====================

const memoryStore = {
  web: {value: '', expire: 0},
}
const getToken = async (type: string) => {
  let token = memoryStore[type]?.value
  const expire = memoryStore[type]?.expire || 0
  if (Date.now() > expire) {
    token = ''
  }
  if (!token) {
    const client = webApp
    token = await client?.fetchToken()
  }
  return token
}
const setToken = async (type: string, token: string) => {
  memoryStore[type].value = token
  memoryStore[type].expire = Date.now() + (TOKEN_TTL * 1000)
}

// 公众号应用
const getWebApp = (raiseError = false) => {
  if (!config.WECHAT_APP_ID || !config.WECHAT_APP_SECRET) { return }
  if (!webApp) {
    webApp = new MyWebApi({ appid: config.WEB_APP_ID, appsecret: config.WECHAT_APP_SECRET, })
    // 多进程之间共享 token
    webApp.setTokenHandler({
      async getToken () {
        return getToken('web')
      },
      async setToken (token: string) {
        return setToken('web', token)
      },
    })
  }
  if (raiseError && !webApp) {
    throw new Error('公众号未配置')
  }
  return webApp
}

export default {
  // 主动发送客服消息
  async sendMessage (openId: string, data: any) {
    const client: MyWebApi = await getWebApp(true)
    const ret = await client.message.send(openId, 'text', data)
    if (ret.errcode) {
      logger.error(`发送客服消息出错： ${ret.errcode} ${ret.errmsg}`)
      throw new Error(ret.errmsg)
    }
  },
}
