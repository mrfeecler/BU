const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE, delay } = require("../../helper/const-variable");
const { getMonthBefore } = require("../../helper/datetime");
const { API_URL } = require("../../helper/url-store");

class FetchVolumeCategoryFlow {
  static async execute() {
    await axios
      .get(`${API_URL.bu_api}/category-all`)
      .then(async (res) => {
        const categories = res.data;
        const ids = categories
          .map((x) => x.id)
          .filter((value, index, self) => self.indexOf(value) === index);

        const items = [];
        if (ids.length > 0) {
          const dataWithVolumn = await FetchVolumeCategoryFlow.fetchVolumn(ids);
          if (dataWithVolumn.length > 0) {
            items.push(...dataWithVolumn);
          }
        }
        MessageBroker.sendMessage(items, DATA_TYPE.category_volumn);
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
        const apiUrl = `${API_URL.volumeForCoinGroup}?categoryId=${id}&from=${lastMonth}`;
       // for sub category 
       // const apiUrl = `${API_URL.volumeForCoinGroup}?tagId=${id}&from=${lastMonth}`;
        try {
          const response = await axios.get(apiUrl);
          const volumns = response.data.data;
          for (let index = 31; index <= volumns.length; index++) {
            const element = volumns[index];
            result.push({
              ...element,
              category_id: id,
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
module.exports = FetchVolumeCategoryFlow;
