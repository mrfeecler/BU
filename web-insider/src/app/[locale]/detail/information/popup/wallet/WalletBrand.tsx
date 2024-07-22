import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Divider, Flex } from 'antd';
import Link from 'next/link';
import { FC, memo } from 'react';
import { Wallets } from '../../Contracts';

type TWalletBrand = {
  currentWallet: string;
  handleWallet: (wallet: string) => void;
};
const WalletBrand: FC<TWalletBrand> = ({ currentWallet, handleWallet }) => {
  return (
    <Flex vertical gap={12} className='min-w-[220px]'>
      <Text weight='bold' size={16} lineHeight={24} className={'pt-3 px-3'}>
        Wallets
      </Text>
      <Flex className='px-3'>
        <Divider className='!m-0 !border-[#E5E6EB]' />
      </Flex>
      <Flex
        vertical
        className={cn(
          'max-h-[240px] overflow-y-auto show-scroll',
          'mb-3 pl-3 pr-2 mr-1'
        )}
      >
        {Wallets.map((item) => {
          return (
            <Link
              key={item.key}
              target='_blank'
              href={item.url}
              onClick={() => handleWallet(item.key)}
            >
              <Flex
                className={cn(
                  'p-3 hover:bg-gray-100 rounded',
                  currentWallet === item.key && '!bg-[#EEF2F6]'
                )}
              >
                <Flex align='center' gap={8}>
                  <div className={cn('overflow-hidden w-6')}>{item.icon}</div>
                  <Text weight='semiBold'>{item.name}</Text>
                </Flex>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default memo(WalletBrand);
