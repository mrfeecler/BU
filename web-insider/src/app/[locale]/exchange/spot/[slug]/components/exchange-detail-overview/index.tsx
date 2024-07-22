'use client';

import {
  IconDiscord,
  IconFile,
  IconGithub,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import IconSource from '@/assets/icons/IconSource';
import IconWeb from '@/assets/icons/IconWeb';
import HexagonItem from '@/components/Hexa/Hexagon';
import Text from '@/components/Text';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { nFormatter, percentFormat } from '@/helpers';
import { COLOR_CHART } from '@/helpers/constants';
import { changeImageUrl, cn } from '@/helpers/functions';
import { FetchInfomationCoin } from '@/usecases/exchange';
import { Flex, Modal, Popover } from 'antd';
import { round } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CoinAllocation, ICoinInfo, ILink } from '../../props';
import IconFacebook from '../icons/IConFacebook';
import Allocation from './allocation';
import './index.scss';

const linkRef = [
  'twitter',
  'web',
  'telegram',
  'discord',
  'facebook',
  'medium',
  'github',
  'file',
];

export function _renderIconLinks(type: string) {
  switch (type) {
    case 'twitter':
      return <IconTwitter />;
    case 'web':
      return <IconWeb />;
    case 'telegram':
      return <IconTelegram />;
    case 'discord':
      return <IconDiscord />;
    case 'facebook':
      return <IconFacebook />;
    case 'medium':
      return <IconMedium />;
    case 'github':
      return <IconGithub />;
    case 'file':
      return <IconFile />;
    default:
      return;
  }
}

const CoinInformation = () => {
  const params = useParams<{ locale: string; slug: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinsData, setCoinsData] = useState<ICoinInfo>();
  const [totalVolume, setTotalVolume] = useState<number>(9999);
  const [listTopCoin, setListTopCoin] = useState<CoinAllocation[]>([]);

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const getData = async () => {
    const responses: any = await FetchInfomationCoin({ key: params.slug });
    if (!responses) return;
    if (responses.name) handleBreadcrumb([{ title: responses.name }]);
    setCoinsData(responses);
    setTotalVolume(responses?.totalUsdVolume);
    setListTopCoin(sortTokenAllocation(responses?.tokenAllocation));
  };

  useEffect(() => {
    getData();
  }, [params.slug]);

  const colorChart = [
    COLOR_CHART.BITTER_LEMON,
    COLOR_CHART.MALACHITE,
    COLOR_CHART.PAOLO_VERONESE_GREEN,
    COLOR_CHART.TURQUOISE_SURF,
    COLOR_CHART.CERULEAN_FROST,
    COLOR_CHART.PLUMP_PURPLE,
    COLOR_CHART.PURPUREUS,
    COLOR_CHART.JAZZBERRY_JAM,
    COLOR_CHART.CERISE,
    COLOR_CHART.SUNSET_ORANGE,
  ];

  const sortTokenAllocation = (listTokenAllocation: CoinAllocation[]) => {
    if (listTokenAllocation.length == 0) return [];
    return listTokenAllocation.sort((a, b) => {
      return b.percentUsdVolume - a.percentUsdVolume;
    });
  };

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  const _renderLinks = () => {
    const links: ILink[] = (coinsData?.links ?? []).filter((link) =>
      linkRef.includes(link.type)
    );
    const elements: JSX.Element[] = links.slice(0, 4).map((link: ILink) => {
      return (
        <Link target='_blank' href={link.value} key={link.value}>
          {_renderIconLinks(link.type)}
        </Link>
      );
    });

    const remainingElements: JSX.Element[] = links
      .slice(4)
      .map((link: ILink) => (
        <Link href={link.value} key={link.value}>
          {_renderIconLinks(link.type)}
        </Link>
      ));

    return (
      <Flex vertical gap={8}>
        <Text type='secondary'>Links</Text>
        <Flex gap={20}>
          {elements.length > 0 ? elements : '-'}
          {links.length > 4 && (
            <Popover
              trigger='hover'
              placement='bottom'
              content={<Flex gap={20}>{remainingElements}</Flex>}
            >
              <div className='w-7 h-7 bg-slate-200 rounded-3xl flex-col justify-center items-center inline-flex'>
                <div className='text-grey-700 text-xs font-jsb leading-tight hover:cursor-pointer'>
                  +{remainingElements.length}
                </div>
              </div>
            </Popover>
          )}
        </Flex>
      </Flex>
    );
  };

  const _caculateCoin = (i: number) => {
    let rate = round((listTopCoin[i]?.usdVolume / totalVolume) * 100, 2);
    let name = listTopCoin[i]?.coinName;
    let volumes = listTopCoin.slice(0, 9).map((item) => item?.usdVolume);
    let otherSum =
      totalVolume - volumes.reduce((total, volume) => total + volume, 0);
    let otherRate = round((otherSum / totalVolume) * 100, 2);
    if (i < 9) {
      return (
        <div className='flex text-sm font-jm'>
          <span className='mr-1'>{name + ': '}</span>
          <span>{rate + '%'}</span>
        </div>
      );
    } else {
      return (
        <div className='flex text-sm font-jm'>
          <span className='mr-1'>Other:</span>
          <span>{otherRate + '%'}</span>
        </div>
      );
    }
  };

  const _caculateCoinOther = (item: CoinAllocation) => {
    let rate = percentFormat((item?.usdVolume / totalVolume) * 100, '', {
      noPlus: true,
      noStyle: true,
    });

    let name = item?.coinName;
    return (
      <div className='flex text-sm font-jm'>
        <span className='mr-1'>{name + ': '}</span>
        {rate}
      </div>
    );
  };

  const _renderLinePopup = (item: CoinAllocation, i: number) => {
    let _color = colorChart[i];
    return (
      <div className='flex gap-3'>
        <div>
          <HexagonItem color={_color} />
        </div>
        {_caculateCoinOther(item)}
      </div>
    );
  };

  const NativeToken = useMemo(() => {
    const LogoElement = (
      <img
        src={changeImageUrl(coinsData?.nativeCoin?.logo || '')}
        alt={coinsData?.name}
        className='w-5 h-5 max-w-5 max-h-5 min-w-5 min-h-5'
        width={20}
        height={20}
      />
    );
    const SymbolElement = (
      <div className='ml-2 text-grey-700 text-base font-jsb leading-normal'>
        {coinsData?.nativeCoin?.symbol}
      </div>
    );

    if (!coinsData?.nativeCoin?.logo && coinsData?.nativeCoin?.symbol)
      return SymbolElement;

    if (coinsData?.nativeCoin?.logo && !coinsData?.nativeCoin?.symbol)
      return LogoElement;

    if (!coinsData?.nativeCoin?.logo && !coinsData?.nativeCoin?.symbol)
      return '-';

    return (
      <Link
        target='_blank'
        href={`/${params.locale}/detail/${coinsData?.nativeCoin?.key}`}
      >
        <Flex>
          {LogoElement}
          {SymbolElement}
        </Flex>
      </Link>
    );
  }, [coinsData]);

  return (
    <div className='w-full bg-white mx-auto'>
      <Modal
        title={
          <div className='font-bold font-jb text-2xl'>
            Token Allocation Other
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <div className='mt-4'>
          {...listTopCoin.slice(3, 10).map((item, index) => {
            return (
              <div key={index} className='mb-3'>
                {_renderLinePopup(item, index)}
              </div>
            );
          })}
        </div>
      </Modal>

      <div className='coins bg-white p-6 mb-6 gap-1.5 rounded-lg box-shadow-common'>
        <div className='border-b border-grey-300 flex pb-6 mb-6 justify-between'>
          <div className='flex gap-4 items-center justify-center'>
            {coinsData?.icon ? (
              <img
                src={changeImageUrl(coinsData?.icon)}
                alt={coinsData?.name}
              />
            ) : (
              ''
            )}
            <div className='flex-col gap-3 justify-start inline-flex'>
              <div className='text-grey-700 text-2xl font-jb'>
                {coinsData?.name}
              </div>
              <div className='justify-start items-center inline-flex'>
                {coinsData?.tier && (
                  <>
                    <Link
                      target='_blank'
                      href='../spot'
                      className={cn(
                        'px-2 py-0.5 bg-grey-200 rounded',
                        'items-center cursor-pointer'
                      )}
                    >
                      <div className='text-grey-500 text-xs font-jm'>
                        Tier
                        <span className='ml-1'>{coinsData?.tier}</span>
                      </div>
                    </Link>
                    {coinsData?.yearOfFoundation && (
                      <div className='w-px h-5 border bg-grey-400 mx-3' />
                    )}
                  </>
                )}

                {coinsData?.yearOfFoundation && (
                  <>
                    <div className='flex items-center gap-1'>
                      <span className='text-grey-500 text-xs font-jm'>
                        Year of Foundation:
                      </span>
                      <span className='text-grey-700 text-xs font-jb'>
                        {moment(coinsData?.yearOfFoundation).format('YYYY')}
                      </span>
                    </div>
                    {coinsData?.country && (
                      <div className='w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full' />
                    )}
                  </>
                )}

                {coinsData?.country && (
                  <Popover
                    content={
                      <div className='text-right text-grey-700 text-xs font-medium leading-tight'>
                        {coinsData?.country}
                      </div>
                    }
                    trigger='hover'
                  >
                    <Link target='_blank' href='../spot'>
                      {coinsData?.country ? (
                        <div>
                          <img
                            className='shadow-[0_1px_10px_0_rgba(51,55,71,0.15)]'
                            height={23}
                            width={33}
                            src={`/Flag/Country=${coinsData?.country}, Style=Flag, Radius=Off.svg`}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </Link>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-5'>
          <div className='col-span-5 md:col-span-3'>
            <div className='grid grid-cols-2'>
              <div className='col-span-2 xl:col-span-1'>
                <div className='flex-col justify-start gap-2 inline-flex'>
                  <div className='flex items-center'>
                    <Text type='secondary'>Spot Trading Volume</Text>
                  </div>

                  <div className='items-center gap-4 inline-flex'>
                    <span className='text-[40px] font-jeb text-grey-700 leading-[48px]'>
                      {nFormatter(
                        Number(coinsData?.spotTradingVolume.usd),
                        2,
                        '$'
                      )}
                    </span>
                    <span className='text-base font-jsb'>
                      {percentFormat(
                        Number(coinsData?.spotTradingVolume.percent)
                      ) || ''}
                    </span>
                  </div>

                  <div className='text-grey-700 text-sm font-jm leading-tight'>
                    {coinsData?.spotTradingVolume.btc
                      ? nFormatter(
                          Number(coinsData?.spotTradingVolume.btc),
                          3,
                          'BTC '
                        )
                      : ''}
                  </div>
                </div>

                <div className='coins__socials mt-8'>
                  <div className='coins__links flex-col justify-start items-start gap-2 inline-flex'>
                    {_renderLinks()}
                  </div>
                </div>
              </div>

              <div className='col-span-2 xl:col-span-1'>
                <div className='coins__category xl:w-4/5 flex-wrap flex gap-y-6'>
                  <div className='category'>
                    <div className='coins__title'>Market Share</div>
                    <div className='category__number'>
                      {coinsData?.marketShare
                        ? coinsData?.marketShare + '%'
                        : '-'}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Financial Reserves</div>
                    <div className='category__number'>
                      {nFormatter(Number(coinsData?.financialReserves), 2, '$')}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Coins</div>
                    <div className='category__number'>
                      {coinsData?.coinsCount ? coinsData?.coinsCount : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Trading Pairs</div>
                    <div className='category__number'>
                      {coinsData?.pairsCount ? coinsData?.pairsCount : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title mb-2'>Native Token</div>
                    <div className='category__link flex'>{NativeToken}</div>
                  </div>
                  <div className='category'>
                    <div className='coins__title mb-2'>Fees</div>
                    <div className='category__link flex'>
                      {coinsData?.fees ? (
                        <>
                          <IconSource />
                          <Link href=''>
                            <div className='items-center ml-2 text-grey-700 text-base font-jsb underline'>
                              Source
                            </div>
                          </Link>
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-5 pt-5 md:pt-0 md:col-span-2 border-t md:border-t-0 md:border-l border-gray-200'>
            <div className='md:ml-6 '>
              <Allocation
                list={listTopCoin}
                total={totalVolume}
                toggleModal={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInformation;
