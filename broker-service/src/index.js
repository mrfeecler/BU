const FetchFundsFlow                    = require("./fetch_data/common/fetchFunsFlow");
const FetchGlobalFlow                   = require("./fetch_data/common/fetchGlobalFlow");
const FetchTagFlow                      = require("./fetch_data/common/fetchTagFlow");
const FetchIeoIdoProjectUpComingFlow    = require("./fetch_data/ieo-ido/fetchIeoIdoProjectUpcomingFlow");
const FetchIeoIdoProjectEndedFlow       = require("./fetch_data/ieo-ido/fetchIeoIdoProjectEndedFlow");
const FetchCategoryFlow                 = require("./fetch_data/home/fetchCategoryFlow");
const FetchCategoryGainerLoserFlow      = require("./fetch_data/home/fetchCategoryGainerLoserFlow");
const FetchCoinFlow                     = require("./fetch_data/home/fetchCoinFlow");
const FetchFundraisingFlow              = require("./fetch_data/home/fetchFundraisingFlow");
const FetchTrendingFlow                 = require("./fetch_data/home/fetchTrendingFlow");
const FetchCoin_IeoIdoFlow              = require("./fetch_data/coin-detail/fetchCoinIeoIdoFlow");
const FetchExchangeFlow                 = require("./fetch_data/exchange/fetchExchangeFlow");
const FetchTokenUnlockFlow              = require("./fetch_data/unlock/fetchTokenUnlockFlow"); 
const FetchIeoIdoTopIdoLaunchPadFlow    = require("./fetch_data/ieo-ido/fetchIeoIdoTopIdoLaunchPad");
const FetchVolumeCategoryFlow           = require("./fetch_data/common/fetchVolumeCategory.flow");
const FetchVolumeIdoFlow                = require("./fetch_data/common/fetchVolumeIdo.flow");
const FetchEthGasPrices                 = require("./fetch_data/common/fetchEthGasPrices");
const FetchFearGreedFlow                = require("./fetch_data/common/fetchFearGreed");

FetchCoinFlow.execute();
// FetchCategoryFlow.execute();
// FetchCategoryGainerLoserFlow.execute();
// FetchCoin_IeoIdoFlow.execute();
// FetchExchangeFlow.execute();  
// FetchGlobalFlow.execute(); 
// FetchTagFlow.execute();
// FetchTokenUnlockFlow.execute();
// FetchTrendingFlow.execute();
// FetchIeoIdoProjectUpComingFlow.execute();
// FetchIeoIdoProjectEndedFlow.execute();
// FetchIeoIdoTopIdoLaunchPadFlow.execute();
// FetchFundsFlow.execute();
// FetchVolumeCategoryFlow.execute();
// FetchVolumeIdoFlow.execute();
// FetchFundraisingFlow.execute()
// FetchEthGasPrices.execute();
// FetchFearGreedFlow.execute();
 