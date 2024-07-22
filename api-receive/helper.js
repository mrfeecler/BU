function formatDataCoinSave(data) {
  return data.datas.map((item) => {
    return {
      symbol: item.symbol,
      key: item.slug,
      price: item.quote.USD.price,
      quote: item.quote,
      circulating_supply: item.circulating_supply,
    };
  });
}

module.exports = {
  formatDataCoinSave,
};
