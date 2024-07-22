const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchGlobalFlow {
  static execute() {
    const apiUrl = API_URL.global;
    axios
      .get(apiUrl)
      .then((response) => {
        MessageBroker.sendMessage(response.data, DATA_TYPE.global);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchGlobalFlow;
