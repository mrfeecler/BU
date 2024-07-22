const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchTagFlow {
  static execute() {
    const apiUrl = API_URL.tag;
    axios
      .get(apiUrl)
      .then((response) => {
        const categories = response.data.data.map((ca) => {
          return {
            id: ca.id,
            name: ca.name,
            slug: ca.slug,
            ruName: ca.ruName,
            avgPriceChange: ca.avgPriceChange,
            gainers: ca.gainers,
            losers: ca.losers,
            rankedCoins: ca.rankedCoins,
            isIcoList: ca.isIcoList,
            market_cap: ca.marketCap,
            volume24h: ca.volume24h,
            yesterday: ca.yesterday,
            dominance: ca.dominance,
            type: "sub",
            gainer7d: null,
            gainer1m: null,
            loser7d: null,
            loser1m: null
          };
        });
        MessageBroker.sendMessage(categories, DATA_TYPE.category);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchTagFlow;
