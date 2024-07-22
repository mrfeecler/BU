const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchCategoryFlow {
  static execute() {
    const apiUrl = API_URL.category;
    axios
      .get(apiUrl)
      .then((response) => {
        MessageBroker.sendMessage(response.data.data, DATA_TYPE.category);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}

module.exports = FetchCategoryFlow;
