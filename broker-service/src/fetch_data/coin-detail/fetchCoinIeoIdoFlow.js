const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchCoinIeoIdoFlow {
  static execute() {
    const coin_upcomings = [];
    const apiUrl = API_URL.coin + "/crowdsales";
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data.data;
        for (const key in data) {
          const elements = data[key];
          elements.forEach((item) => {
            item.coin_key = key;
            coin_upcomings.push(item);
          });
        }
        MessageBroker.sendMessage(coin_upcomings, DATA_TYPE.coinUpcoming);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchCoinIeoIdoFlow;
