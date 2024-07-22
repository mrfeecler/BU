const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchExchangeFlow {
  static execute() {
    const apiUrl = API_URL.exchange;
    axios
      .get(apiUrl)
      .then(async (response) => {
        const datas = response.data;
        const ids = datas.map((x) => x.key);
        await FetchExchangeFlow.processChartData(ids, datas);
        MessageBroker.sendMessage(datas, DATA_TYPE.exchange);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }

  static async processChartData(ids, datas) {
    try {
      const keys = ids.join(",");
      const url = `${API_URL.getExchangeChart}?keys=${keys}&days=7`;

      const response = await axios.get(url);
      const exchangeData = response.data.data;

      for (const item of datas) {
        const exchangeChart = exchangeData[item.key];

        if (exchangeChart) {
          const timestamps = exchangeChart.timestamps.map((timestamp) => {
            const dateTime = new Date(timestamp);
            const formattedDate = `${dateTime.getDate()}/${
              dateTime.getMonth() + 1
            }/${dateTime.getFullYear()}`;
            return formattedDate;
          });

          exchangeChart.timestamps = timestamps;
          item.dataChart = exchangeChart;
          item._group = item.group;
          item.volume24h = item.volumes.day.toUSD;
          delete item.group;
        }
      }
    } catch (error) {
      console.error(`Error processing batch: ${error.message}`);
    }
  }
}
module.exports = FetchExchangeFlow;
