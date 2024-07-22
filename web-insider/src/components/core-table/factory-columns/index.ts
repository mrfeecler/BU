// --------------------- HOME ---------------------//
import home_all_coins, { allCoinsMobileColumnsKey } from './home/all-coin';
import home_categories, { categoriesMobileColumnsKey } from './home/categories';
import home_trending, { trendingMobileColumnsKey } from './home/trending';
import home_fundraising, {
  fundraisingMobileColumnsKey,
} from './home/fundraising';
import home_upcoming, { upComingMobileColumnsKey } from './home/upcoming';
import home_gainers, { gainersMobileColumnsKey } from './home/gainers';

// --------------------- DETAIL MARKET ---------------------//
import detail_market_spot, {
  marketsPotColumnsKey,
} from './detail/markets-spot';
import detail_market_historical, {
  marketsHistoricalsColumnsKey,
} from './detail/markets-historicals';

// --------------------- IDO IEO ---------------------//
import ido_ieo_upcoming, { idoIeoUpcomingColumnsKey } from './ido-ieo/upcoming';
import ido_ieo_ongoing, { idoIeoOnGoingColumnsKey } from './ido-ieo/on-going';
import ido_ieo_ended, { idoIeoEndedColumnsKey } from './ido-ieo/ended';
import ido_ieo_top_ieo_launch_pads, {
  idoIeoTopIeoLaunchPadsColumnsKey,
} from './ido-ieo/top-ieo-launchpads';
import ido_ieo_top_ido_launch_pads, {
  idoIeoTopIdoLaunchPadsColumnsKey,
} from './ido-ieo/top-ido-launchpads';
import ido_ieo_upcoming_detail, {
  idoIeoUpcomingDeteailColumnsKey,
} from './ido-ieo/upcoming-detail';
import ido_ieo_ended_detail, {
  idoIeoEndedDetailColumnsKey,
} from './ido-ieo/ended-detail';

export const factoryColumns = {
  home_all_coins,
  home_categories,
  home_trending,
  home_fundraising,
  home_upcoming,
  home_gainers,

  detail_market_spot,
  detail_market_historical,

  ido_ieo_upcoming,
  ido_ieo_ongoing,
  ido_ieo_ended,
  ido_ieo_top_ieo_launch_pads,
  ido_ieo_top_ido_launch_pads,
  ido_ieo_upcoming_detail,
  ido_ieo_ended_detail,
};

export const factoryMobileColumnsKey = {
  home_all_coins: allCoinsMobileColumnsKey,
  home_categories: categoriesMobileColumnsKey,
  home_trending: trendingMobileColumnsKey,
  home_fundraising: fundraisingMobileColumnsKey,
  home_upcoming: upComingMobileColumnsKey,
  home_gainers: gainersMobileColumnsKey,

  detail_market_spot: marketsPotColumnsKey,
  detail_market_historical: marketsHistoricalsColumnsKey,

  ido_ieo_upcoming: idoIeoUpcomingColumnsKey,
  ido_ieo_ongoing: idoIeoOnGoingColumnsKey,
  ido_ieo_ended: idoIeoEndedColumnsKey,
  ido_ieo_top_ieo_launch_pads: idoIeoTopIeoLaunchPadsColumnsKey,
  ido_ieo_top_ido_launch_pads: idoIeoTopIdoLaunchPadsColumnsKey,
  ido_ieo_upcoming_detail: idoIeoUpcomingDeteailColumnsKey,
  ido_ieo_ended_detail: idoIeoEndedDetailColumnsKey,
};
export type FactoryColumns = keyof typeof factoryColumns;
