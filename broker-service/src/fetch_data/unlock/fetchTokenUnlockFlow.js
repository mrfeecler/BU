const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchTokenUnlockFlow {
  static execute() {
    const apiUrl = API_URL.token_unlock;
    const params = {
      limit: 100,
      skip: 400,
    };
    axios
      .post(apiUrl, params)
      .then((response) => {
        const coins = response.data.data.map((item) => {
          item.marketcap = item.marketCap;
          delete item.marketCap;
          return item;
        });
        MessageBroker.sendMessage(coins, DATA_TYPE.token_unlock);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchTokenUnlockFlow;
