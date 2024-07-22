const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchIeoIdoProjectEndedFlow {
  static execute() {
    const apiUrl = API_URL.ieoido_project_ended;
    const params = {
      filters: {},
      limit: 10000,
      path: "round/past",
      skip: 0,
      status: "past",
    };

    axios
      .post(apiUrl, params)
      .then((response) => {
        const datas = response.data.data.map(item => {
          const start_date = item.when;
          const category_name = item.category ? item.category.name: "";
          delete item.when;
          return {
            ...item,
            start_date: start_date,
            category_name,
            status: "past"
          }
        })
        MessageBroker.sendMessage(datas, DATA_TYPE.ieo_ido_project_ended);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchIeoIdoProjectEndedFlow;
