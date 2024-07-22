const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchFearGreedFlow {
  static execute() {
    const apiUrl = API_URL.fearGreed;
    axios
      .get(apiUrl)
      .then((response) => {
        MessageBroker.sendMessage(response.data, DATA_TYPE.fearGreed);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchFearGreedFlow;
