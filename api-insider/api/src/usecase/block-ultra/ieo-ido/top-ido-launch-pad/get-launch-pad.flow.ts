import { UrlUtil } from '../../../../core/utils/url.util';
import { AxiosService } from '../../../../infrastructure/services/axios.service';
import { ICoinService } from '../../../../core/interfaces/coin';
import { IeoIdoTopIdoLaunchPadService } from '../../../../infrastructure/services/ieo-ido-top-ido-launch-pad.service';
import { DateUtil } from '../../../../core/utils/date.util';

export class GetLaunchPadFlow {
  constructor(
    private readonly service: IeoIdoTopIdoLaunchPadService,
    private readonly coinService: ICoinService,
  ) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ key });
    let launchPad   = await query.getOne();
    const coinQuery = await this.coinService.getQueryBuilder();
    const coinKey = launchPad && launchPad.nativeToken ? launchPad.nativeToken.key : '';
    if (!coinKey) {
      return null;
    }
    coinQuery.where({ key: coinKey });
    coinQuery.select(['price', '"histPrices"']);
    const coin = await coinQuery.getRawOne();
    if (!launchPad.gainers) {
      const dateNow = DateUtil.getCurrentDate(0, 1);
      const param = `from=${dateNow}&idoPlatformId=${launchPad.id}`;
      const url = UrlUtil.getGainerLoserUrl(param);
      const response = await AxiosService.get(url);
      launchPad = {
        ...launchPad,
        gainers: response.data.data.gainers,
        losers: response.data.data.losers,
      };
      this.service.update(launchPad);
    }

    if (!launchPad.gainer7d) {
      const dateNow = DateUtil.getDateBefore(7);
      const param = `from=${dateNow}&idoPlatformId=${launchPad.id}`;
      const url = UrlUtil.getGainerLoserUrl(param);
      const response = await AxiosService.get(url);
      launchPad = {
        ...launchPad,
        gainer7d: response.data.data.gainers,
        loser7d: response.data.data.losers,
      };
      this.service.update(launchPad);
    }

    if (!launchPad.gainer1m) {
      const dateNow = DateUtil.getDateBefore(30);
      const param = `from=${dateNow}&idoPlatformId=${launchPad.id}`;
      const url = UrlUtil.getGainerLoserUrl(param);
      const response = await AxiosService.get(url);
      launchPad = {
        ...launchPad,
        gainer1m: response.data.data.gainers,
        loser1m: response.data.data.losers,
      };
      this.service.update(launchPad);
    }

    return { ...launchPad, price: coin?.price, histPrices: coin?.histPrices };
  }
}

export default GetLaunchPadFlow;
