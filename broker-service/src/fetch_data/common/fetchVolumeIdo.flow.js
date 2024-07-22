const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE, delay } = require("../../helper/const-variable");
const { getMonthBefore } = require("../../helper/datetime");
const { API_URL } = require("../../helper/url-store");

class FetchVolumeIdoFlow {
  static async execute() {
    const apiUrl = API_URL.volumeIdo;
    await axios
      .get(apiUrl)
      .then(async (response) => {
        const platforms = response.data.data.slice(0, 10);
        const ids = platforms
          .map((x) => x.id)
          .filter((value, index, self) => self.indexOf(value) === index);

        const items = [];
        if (ids.length > 0) {
          const dataWithVolumn = await FetchVolumeIdoFlow.fetchVolumn(ids);
          if (dataWithVolumn.length > 0) {
            items.push(...dataWithVolumn);
          }
        }
        MessageBroker.sendMessage(items, DATA_TYPE.ido_volumn);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
 

  static async fetchVolumn(ids) {
    try {
      let result = [];
      const currentDate = getMonthBefore(0);
      const lastMonth   = getMonthBefore(1);
      for (const id of ids) {
        const apiUrl = `${API_URL.volumeForCoinGroup}?idoPlatformId=${id}&from=${lastMonth}`;
        try {
          const response = await axios.get(apiUrl);
          const volumns = response.data.data;
          for (let index = 31; index <= volumns.length; index++) {
            const element = volumns[index];
            result.push({
              ...element,
              ido_platform_id: id,
              from_date: lastMonth,
              to_date: currentDate,
            });
          }
          await delay(5000);
        } catch (error) {
          console.error(`Error processing category ${id}: ${error.message}`);
        }
      }
      return result;
    } catch (error) {
      console.error(`Error processing batch: ${error.message}`);
    }
  }
}
module.exports = FetchVolumeIdoFlow;
