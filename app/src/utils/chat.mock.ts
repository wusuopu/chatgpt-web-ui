import Config from "@/config";

let count = 1
const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve,ms);
  })
}
export default {
  async send() {
    if (Config.NODE_ENV === 'development') {
      await sleep(6000)
    }

    if ((count++) % 4 === 0) {
      throw new Error("mock error");
    }

    return {
      text: 'mock text Response',
      conversationId: '1',
      id: '1',
    }
  },
}
