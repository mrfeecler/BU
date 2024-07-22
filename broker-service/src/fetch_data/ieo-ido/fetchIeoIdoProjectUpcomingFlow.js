const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

 class FetchIeoIdoProjectUpComingFlow {
  static execute() {
    const apiUrl = API_URL.ieoido_project_upcoming;
    const parameters = {
      filters: {},
      limit: 1000,
      skip: 0,
      path: "round/upcoming",
      status: "upcoming",
    };
    axios
      .post(apiUrl, parameters)
      .then((response) => {
        const datas = response.data.data.map(item => {
          const start_date = item.when;
          delete item.when;
          const category_name = item.category.name;
          return {
            ...item,
            start_date: start_date,
            category_name,
            status: "upcoming"
          }
        })
        MessageBroker.sendMessage(datas, DATA_TYPE.ieo_ido_project_upcoming);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchIeoIdoProjectUpComingFlow;