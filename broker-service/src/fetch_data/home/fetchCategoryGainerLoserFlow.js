const axios = require("axios");
const MessageBroker = require("../../helper/message-broker");
const { DATA_TYPE } = require("../../helper/const-variable");
const { API_URL } = require("../../helper/url-store");
const { getDateBefore } = require("../../helper/datetime");

class FetchCategoryGainerLoserFlow {
  static async execute() {
    let categories = []; 
    await axios.get(`${API_URL.bu_api}/category-all`).then((res) => {
      categories = res.data;
    });
    try {
      await Promise.all(categories.map(async (element) => {
        // fetch data 7d
        if(!element.gainer7d || element.loser7d ){
          const apiUrl7d = FetchCategoryGainerLoserFlow.getUrl7d(element.id, element.type);
          const response7d = await axios.get(apiUrl7d);
          const data7d = response7d.data.data;
          element.gainer7d = data7d.gainers;
          element.loser7d = data7d.losers;
        }
  
        if(!element.gainer1m || element.loser1m ){
          const apiUrl1m = FetchCategoryGainerLoserFlow.getUrl1m(element.id, element.type);
          const response1m = await axios.get(apiUrl1m);
          const data1m = response1m.data.data;
          element.gainer1m = data1m.gainers;
          element.loser1m = data1m.losers;
        }
        // fetch data 1m
  
      }));
    } catch (error) {
      console.log(error);
    }
    
    if (categories) {
      MessageBroker.sendMessage(categories, DATA_TYPE.category);
    }
  }

  static getUrl7d(category_id, type) {
    const date = getDateBefore(7);
    let apiUrl = `${API_URL.category_gainer_loser}?from=${date}&categoryId=${category_id}`;
    if(type == "sub"){
      apiUrl = `${API_URL.category_gainer_loser}?from=${date}&tagId=${category_id}`;
    } 
    return apiUrl;
  }

  static getUrl1m(category_id, type) {
    const date = getDateBefore(30);
    let apiUrl = `${API_URL.category_gainer_loser}?from=${date}&categoryId=${category_id}`;
    if(type == "sub"){
      apiUrl = `${API_URL.category_gainer_loser}?from=${date}&tagId=${category_id}`;
    }
    return apiUrl;
  }
}

module.exports = FetchCategoryGainerLoserFlow;
