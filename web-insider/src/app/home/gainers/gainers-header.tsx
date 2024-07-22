import IconSelectArrow from '@/assets/icons/IconSelectArrow';
import Text from '@/components/Text';
import { TIME_FILTER_ALL } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { Dropdown, Flex } from 'antd';
import { useState } from 'react';

const allCoin = [
  {
    key: 'all',
    label: 'All Coins',
  },
  {
    key: '100',
    label: 'Top 100',
  },
  {
    key: '300',
    label: 'Top 300',
  },
  {
    key: '500',
    label: 'Top 500',
  },
];

type GainersHeaderProps = {
  onFilterCoins: (coin: string) => void;
  onFilterTime: (time: string) => void;
};

const GainersHeader = ({ onFilterCoins, onFilterTime }: GainersHeaderProps) => {
  const CoinOptions = allCoin.map((item) => ({
    ...item,
    label: <Text weight='semiBold'>{item.label}</Text>,
  }));

  const TimeOptions = TIME_FILTER_ALL.map((item) => ({
    ...item,
    label: <Text weight='semiBold'>{item.label}</Text>,
  }));

  const [coinSelected, setCoinSelected] = useState(CoinOptions[0]);
  const [timeSelected, setTimeSelected] = useState(TimeOptions[0]);

  const _onChangeCoin = ({ key }: { key: string }) => {
    const item = CoinOptions.find((a) => a?.key === key);
    if (!item) return;
    setCoinSelected({
      ...item,
    });
    onFilterCoins(item.key);
  };

  const _onChangeTime = ({ key }: { key: string }) => {
    const item = TimeOptions.find((a) => a?.key === key);
    if (!item) return;
    setTimeSelected({
      ...item,
    });
    onFilterTime(item.key);
  };

  return (
    <div className='flex flex-col md:flex-row xl:flex-row items-start justify-between gap-3 mb-3'>
      <h3 className='font-bold text-black text-lg md:text-[28px] tracking-[0] leading-[28px] whitespace-nowrap'>
        Top Coin Gainers & Losers
      </h3>
      <div
        className={
          'flex items-center justify-between md:justify-end w-full md:gap-4'
        }
      >
        <Dropdown
          overlayClassName={cn(
            '[&_.ant-dropdown-menu]:!p-2',
            '[&_.ant-dropdown-menu-item]:!py-2',
            '[&_.ant-dropdown-menu-item-selected]:!bg-[#EEF2F6]'
          )}
          menu={{
            items: CoinOptions,
            selectable: true,
            selectedKeys: [coinSelected.key],
            onClick: _onChangeCoin,
          }}
          trigger={['click']}
          className='rounded border border-[#D1D2DC] hover:cursor-pointer'
        >
          <Flex
            gap={8}
            justify='space-between'
            align='center'
            className='py-2 px-4'
          >
            <Text >{coinSelected.label}</Text>
            <IconSelectArrow />
          </Flex>
        </Dropdown>
        <Dropdown
          overlayClassName={cn(
            '[&_.ant-dropdown-menu]:!p-2',
            '[&_.ant-dropdown-menu-item]:!py-2',
            '[&_.ant-dropdown-menu-item-selected]:!bg-[#EEF2F6]'
          )}
          menu={{
            items: TimeOptions,
            selectable: true,
            selectedKeys: [timeSelected.key],
            onClick: _onChangeTime,
          }}
          trigger={['click']}
          className='rounded border border-[#D1D2DC] hover:cursor-pointer'
        >
          <Flex
            gap={8}
            justify='space-between'
            align='center'
            className='py-2 px-4'
          >
            <Text >{timeSelected.label}</Text>
            <IconSelectArrow />
          </Flex>
        </Dropdown>
      </div>
    </div>
  );
};

export default GainersHeader;
