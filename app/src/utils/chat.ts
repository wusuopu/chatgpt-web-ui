import Config from "@/config";
import _ from "lodash";
import chatMock from "./chat.mock";
import { ChatGPTAPI } from "./chatgpt";

interface MsgResponse {
  text: string;
  conversationId?: string;
  id: string;
}

const api = new ChatGPTAPI({
  apiKey: Config.OPENAI_API_KEY,
  debug: Config.NODE_ENV === 'development',
  completionParams: {
    model: Config.OPENAI_MODEL,
  },
})

let API = {
  async send (msg: string, opts?: {conversationId?: string, parentMessageId?: string, timeoutMs?: number}): Promise<MsgResponse> {
    return await api.sendMessage(msg, opts)
  },
}

if (Config.MOCK_API) {
  API = _.assign(API, chatMock)
}

export default API;
