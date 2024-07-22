const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");

class FetchIeoIdoTopIdoLaunchPadFlow {
  static execute() {
    const apiUrl = API_URL.ieoido_top_launchpad;
    axios
      .get(apiUrl)
      .then((response) => {
        MessageBroker.sendMessage(response.data.data, DATA_TYPE.ieo_ido_top_ido_launch_pad);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error.message);
      });
  }
}
module.exports = FetchIeoIdoTopIdoLaunchPadFlow;
