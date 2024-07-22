const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchFundsFlow {
  static execute() {
    const apiUrl = API_URL.funds;
    axios
      .get(apiUrl)
      .then((response) => {
        MessageBroker.sendMessage(response.data.data, DATA_TYPE.funds);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchFundsFlow;
