const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const {
  DATA_TYPE,
  splitIntoBatches,
  getChart,
  delay,
} = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchCoinFlow {
  static async execute() {
    const apiUrl = API_URL.coin;
    let currentCoins = [];
    await axios.get(`${API_URL.bu_api}/coin-key-list`).then((res) => {
        currentCoins = res.data;
    })

    await axios
      .get(apiUrl)
      .then(async (response) => {
        const filteredArray = response.data.data.filter(obj => !currentCoins.includes(obj.key));

        const coins = filteredArray.slice(0, 1000);
        const coinIds = coins
          .map((x) => x.key)
          .filter((value, index, self) => self.indexOf(value) === index);
        const items = [];
        if (coinIds.length > 0) {
          const batchSize = 100;
          const batches = splitIntoBatches(coinIds, batchSize);
          for (const batch of batches) {
            const dataWithChart = await getChart(coins, batch);
            if (dataWithChart) {
              items.push(...dataWithChart);
            }
            await delay(3000);
          }
        }
        MessageBroker.sendMessage(items, DATA_TYPE.coin);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchCoinFlow;
