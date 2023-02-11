let count = 1
export default {
  async send() {
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
