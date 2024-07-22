'use client';

import { IconRecent } from '@/assets/icons/home/IconRecent';
import Text from '@/components/Text';
import { nFormatter, percentFormat } from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Flex } from 'antd';
import { get } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo } from 'react';
import { IGlobalSearch, IRecent } from '../SearchInput/props';
import './index.scss';
import { TYPE_GLOBAL_SEARCH } from '@/helpers/constants';

const SearchResult = ({
  data,
  recents,
  isSearch,
  onClearRecent,
  component,
}: {
  data: IGlobalSearch;
  recents: IRecent[];
  isSearch: boolean;
  onClearRecent: () => void;
  component: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string, type?: TYPE_GLOBAL_SEARCH) => {
    switch (type) {
      case TYPE_GLOBAL_SEARCH.Exchange:
        router.push(`/en/exchange/spot/${path}`);
        break;
      case TYPE_GLOBAL_SEARCH.Category:
        router.push(`/en/categories/${path}`);
        break;
      case TYPE_GLOBAL_SEARCH.Backer:
        router.push(`/en/fundraising/top-backers/detail/${path}`);
        break;
      case TYPE_GLOBAL_SEARCH.Funcraising:
        router.push(`/en/detail/${path}?tab=fundraising`);
        break;
      case TYPE_GLOBAL_SEARCH.Launpatch:
        router.push(`/en/ieo-ido/top-ido-launchpads/${path}`);
        break;
      default:
        router.push(`/en/detail/${path}`);
        break;
    }
  };

  const _renderTrending = () => {
    const { trendings } = data;
    if (!trendings) return null;

    const elements: JSX.Element[] = [];
    trendings.forEach((e) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${e.key}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Trending) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.image?.x60)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div>
                </div>
                <div className='coin-info__content__price flex gap-1'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price, 2, '$')}
                  </span>
                  <span className='price text-xs font-medium font-jm'>
                    {e.priceChangeIn24h
                      ? percentFormat(e.priceChangeIn24h)
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            {e.rank ? (
              <div className='number-of-coin text-xs font-medium font-jm'>
                #{e.rank}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item trending-today mb-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Trending Today
          <Image src='/rocket.png' width={20} height={20} alt='rocket' />
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderCrypto = () => {
    const { coins } = data;
    if (!coins || !coins.length) return;
    const elements: JSX.Element[] = [];

    coins.splice(0, 10).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Crypto) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.image?.x60)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div>
                </div>
                <div className='coin-info__content__price flex items-center gap-1'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price, 2, '$')}
                  </span>
                  <span className='price text-xs font-medium font-jm'>
                    {e.priceChangeIn24h
                      ? percentFormat(e.priceChangeIn24h)
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            {e.rank ? (
              <div className='number-of-coin text-xs font-medium font-jm'>
                #{e.rank}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Coins
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderRecent = () => {
    const elements: JSX.Element[] = [];

    recents.forEach((r, i) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded'
          key={`m-${i}`}
        >
          <div
            onClick={() =>
              handleNavigate(r.key) as any
            }
            className='coin p-1 flex'
          >
            <div className='coin-info flex flex-col items-center'>
              <div className='coin-info__image mb-2'>
                <img
                  src={changeImageUrl(r.icon)}
                  width={32}
                  height={32}
                  alt='btc'
                />
              </div>
              <div className='coin-info__name textover-ellipsis w-20 text-center'>
                {r.name}
              </div>
            </div>
          </div>
        </div>
      );
    });

    if (!recents.length) {
      return <></>;
    }

    return (
      <Flex vertical gap={12} className='modal-search-item'>
        <Flex align='center' justify='space-between'>
          <Flex gap={8} align='center' className='px-4'>
            <Text type='secondary'>Recent</Text>
            <div>
              <IconRecent />
            </div>
          </Flex>
          <Text
            color='primary'
            weight='semiBold'
            className='cursor-pointer pr-4'
            onClick={onClearRecent}
          >
            Clear
          </Text>
        </Flex>
        <Flex gap={32} className='modal-search-item__list px-3 overflow-x-auto'>
          {elements}
        </Flex>
      </Flex>
    );
  };

  const _returnNotFound = () => {
    return <div className='mt-[16px]'>No results found </div>;
  };

  const _renderCategory = () => {
    const elements: JSX.Element[] = [];
    const { categories } = data;
    if (!categories.length) return;
    categories.splice(0, 5).forEach((c, i) => {
      elements.push(
        <div className='modal-search-item__list__item hover:rounded cursor-pointer'>
          <div
            key={c.id}
            onClick={() =>
              handleNavigate(c.id.toString(), TYPE_GLOBAL_SEARCH.Backer) as any
            }
            className='pl-4 pr-4 pt-1 pb-1'
          >
            <p className='text-sm'>{c.name}</p>
          </div>
        </div>
      );
    });
    return (
      <div className='modal-search-item cryptoassets mb-4 mt-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Category
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderUpcoming = () => {
    const { upcomings } = data;
    if (!upcomings || !upcomings.length) return;
    const elements: JSX.Element[] = [];

    upcomings.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Upcoming) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.image)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          IDO/IEOs
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderExchanges = () => {
    const { exchanges } = data;
    if (!exchanges || !exchanges.length) return;
    const elements: JSX.Element[] = [];

    exchanges.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Exchange) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.icon)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  {/* <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Exchanges
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderLaunpatch = () => {
    const { launchpads } = data;
    if (!launchpads || !launchpads.length) return;
    const elements: JSX.Element[] = [];

    launchpads.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Launpatch) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.icon)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  {/* <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Launchpads
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderBacker = () => {
    const { backers } = data;
    if (!backers || !backers.length) return;
    const elements: JSX.Element[] = [];

    backers.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.slug, TYPE_GLOBAL_SEARCH.Backer) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.logo)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  {/* <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Backers
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderUnlock = () => {
    const { unlocks } = data;
    if (!unlocks || !unlocks.length) return;
    const elements: JSX.Element[] = [];

    unlocks.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Unlock) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              {/* <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.logo)}
                  width={32}
                  height={32}
                  alt={e.name}
                />
              </div> */}
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  {/* <div className='coin-tag text-xs font-medium font-jm'>
                    {e.symbol}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Unlock
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderFuncraising = () => {
    const { fundraisings } = data;
    if (!fundraisings || !fundraisings.length) return;
    const elements: JSX.Element[] = [];

    fundraisings.splice(0, 5).forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div
            onClick={() =>
              handleNavigate(e.key, TYPE_GLOBAL_SEARCH.Funcraising) as any
            }
            className='coin p-2 flex justify-between items-center'
          >
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img
                  src={changeImageUrl(e.icon)}
                  height={32}
                  width={32}
                  alt={e.name}
                />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  {e.symbol && (
                    <div className='coin-tag text-xs font-medium font-jm'>
                      {e.symbol}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Funding Rounds
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderContent = () => {
    let isNotfound = true;
    if (!isSearch) {
      return (
        <>
          {_renderTrending()}
          {_renderRecent()}
        </>
      );
    }

    Object.keys(data).forEach((k: any) => {
      if (k === 'trendings') return;
      const dt = get(data, k, []);
      if (dt.length) isNotfound = false;
    });

    if (isNotfound) {
      return _returnNotFound();
    }

    return (
      <>
        {_renderCrypto()}
        {_renderUpcoming()}
        {_renderExchanges()}
        {_renderLaunpatch()}
        {_renderFuncraising()}
        {_renderBacker()}
        {_renderUnlock()}
        {_renderCategory()}
        {_renderRecent()}
      </>
    );
  };

  return (
    <div
      className={cn(
        'modal-search py-4 px-3 w-full rounded-lg z-10 max-h-[84vh]',
        'h-auto overflow-auto',
        component === 'header' ? 'min-w-[431px]' : 'min-w-[583px] '
      )}
    >
      {_renderContent()}
    </div>
  );
};

export default memo(SearchResult);
