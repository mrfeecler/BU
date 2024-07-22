const axios = require("axios");
const { API_URL } = require("./url-store");

const SEED_QUEUE_NAME = "processSeedData";
const DATA_TYPE = {
  coin: "COIN",
  category: "CATEGORY",
  sub_category: "SUB_CATEGORY",
  trending: "TRENDING",
  fundraising: "FUNDRAISING",
  gainer: "GAINER",
  loser: "LOSER",
  upcoming: "UPCOMING",
  global: "GLOBAL",
  token_unlock: "TOKEN_UNLOCK",
  exchange: "EXCHANGE",
  coinUpcoming: "COIN_IEO_IDO",
  funds: "FUNDS",
  ieo_ido_project_upcoming: "IEO_IDO_UPCOMING",
  ieo_ido_project_ended: "IEO_IDO_ENDED",
  ieo_ido_top_ido_launch_pad: "IEO_IDO_TOP_IDO_LAUNCH_PAD",
  category_volumn: "CATEGORY_VOLUMN",
  ido_volumn: "IDO_VOLUMN",
  ethGasPrices: "ETH_GAS_PRICE",
  fearGreed: "FEAR_GREED"
};

function queueDataFormat(key, value) {
  return JSON.stringify({ key, value });
}

function splitIntoBatches(source, batchSize) {
  const batches = [];
  for (let i = 0; i < source.length; i += batchSize) {
    batches.push(source.slice(i, i + batchSize));
  }
  return batches;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getChart(datas, batch) {
  try {
    let result = [];
    const coinIdsString = batch.join(",");
    const getChartsUrl = `${API_URL.coin}/charts?coinKeys=${coinIdsString}&type=price_7d`;

    const response = await axios.get(getChartsUrl);
    const keyValueDatas = response.data;

    for (let index = 0; index < datas.length; index++) {
      if (batch.includes(datas[index].key)) {
        const chartUrl = keyValueDatas[datas[index].key];
        datas[index].price = datas[index].price ? datas[index].price.USD : 0;
        if (chartUrl) {
          const base64 = await convertToBase64(chartUrl);
          datas[index].chart = base64; 
          result.push(datas[index]);
        } else {
          result.push(datas[index]);
        }
        console.log(`chart index ${index} inserted`);
      }
    }
    return result;
  } catch (error) {
    console.error(`Error processing batch: ${error.message}`);
  }
}

async function convertToBase64(data) {
  try {
    if (data) {
      const response = await fetch(data);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        return base64;
      }
    }
  } catch (error) {
    console.error("Error converting to Base64:", error.message);
    return null;
  }
}

module.exports = {
  SEED_QUEUE_NAME,
  queueDataFormat,
  DATA_TYPE,
  splitIntoBatches,
  convertToBase64,
  getChart,
  delay,
};
