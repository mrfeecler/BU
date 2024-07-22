const API_URL = {
    bu_api                  : "http://localhost:4000/api",
    funds                   : "https://api.cryptorank.io/v0/funds?limit=10000&offset=0",
    global                  : "https://api.cryptorank.io/v0/global",
    tag                     : "https://api.cryptorank.io/v0/coin-tags?withSummary=true",
    volumeIdo               : "https://api.cryptorank.io/v0/ido-platforms?isFull=false",
    volumeForCoinGroup      : "https://api.cryptorank.io/v0/analytics/volume-for-coins-group", 
    exchange                : "https://api.cryptorank.io/v0/exchanges?group=main,other,dex",
    getExchangeChart        : "https://api.cryptorank.io/v0/charts/volumes-by-exchange",
    category                : "https://api.cryptorank.io/v0/coin-categories?withSummary=true",
    category_gainer_loser   : "https://api.cryptorank.io/v0/analytics/gainers-losers-for-coins-group",
    coin                    : "https://api.cryptorank.io/v0/coins",
 // fundraising             : "https://api.icodrops.com/portfolio/api/fundraisingRounds?sort=announceDate&order=DESC&page=0&size=1000",
    fundraising             : "https://api.cryptorank.io/v0/funding-rounds-v2",
    ieoido_project_ended    : "https://api.cryptorank.io/v0/round/past",
    ieoido_project_upcoming : "https://api.cryptorank.io/v0/round/upcoming",
    ieoido_top_launchpad    : "https://api.cryptorank.io/v0/ido-platforms?isFull=true",
    token_unlock            : "https://api.cryptorank.io/v0/consolidated-vesting",
    trending                : "https://api.cryptorank.io/v0/coins/trending",
    ethGasPrices            : "https://api.icodrops.com/portfolio/api/marketTotal/ethGasPrices",
    fearGreed               : "https://api.coin-stats.com/v2/fear-greed"
};

module.exports = {API_URL};
