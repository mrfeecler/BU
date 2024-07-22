const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");
const { getMonthBefore } = require("../../helper/datetime");

class FetchTrendingFlow {
  static async execute() {
    const currentDate = getMonthBefore(1);
    const apiUrl =
      API_URL.trending + `/new-coins?dateFrom=${currentDate}&locale=en`;
    axios
      .get(apiUrl)
      .then(async (response) => {
        const coins = response.data.data;
        const coinIds = coins.map((x) => {
          return {
            key: x.key,
            rank: x.rank,
            name: x.name,
            symbol: x.symbol,
            image: x.image,
          };
        });
        MessageBroker.sendMessage(coinIds, DATA_TYPE.trending);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchTrendingFlow;
