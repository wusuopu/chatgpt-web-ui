import Config from "@/config";
import _ from "lodash";
import chatMock from "./chat.mock";

let api
interface MsgResponse {
  text: string;
  conversationId?: string;
  id: string;
}

let API = {
  async send (msg: string, opts?: {conversationId?: string, parentMessageId?: string, timeoutMs?: number}): Promise<MsgResponse> {
    return await api.sendMessage(msg, opts)
  },
}

if (Config.MOCK_API) {
  API = _.assign(API, chatMock)
}

export default API;
