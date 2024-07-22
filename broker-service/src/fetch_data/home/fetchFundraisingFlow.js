const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchFundraisingFlow {
  static execute() {
    const apiUrl = API_URL.fundraising;
    const parameters = {
      filters: {},
      limit: 2000,
      skip: 6000,
      sortingColumn: "date",
      sortingDirection: "DESC",
    };
    axios
      .post(apiUrl, parameters)
      .then((response) => {
        MessageBroker.sendMessage(
          response.data.data,
          DATA_TYPE.fundraising
        );
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchFundraisingFlow;
