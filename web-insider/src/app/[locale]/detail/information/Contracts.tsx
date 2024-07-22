import { IconCaretDown, IconCopy } from '@/assets/icons';
import IconETH from '@/assets/icons/IconETH';
import IconCoin98 from '@/assets/icons/wallet/IconCoin98';
import IconCoinbaseWallet from '@/assets/icons/wallet/IconCoinbaseWallet';
import IconGuarda from '@/assets/icons/wallet/IconGuarda';
import IconMathWallet from '@/assets/icons/wallet/IconMathWallet';
import IconMetaMask from '@/assets/icons/wallet/IconMetaMask';
import IconPhantom from '@/assets/icons/wallet/IconPhantom';
import IconSafePal from '@/assets/icons/wallet/IconSafePal';
import IconTrustWallet from '@/assets/icons/wallet/IconTrustWallet';
import Text from '@/components/Text';
import { cn, copyToClipboard } from '@/helpers/functions';
import { Popover, Tooltip, message } from 'antd';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import WalletAddress from './popup/wallet/WalletAddress';
import WalletBrand from './popup/wallet/WalletBrand';

export const Wallets = [
  {
    key: 'meta-mask',
    name: 'MetaMask',
    icon: <IconMetaMask />,
    url: 'https://metamask.io/',
  },
  {
    key: 'trust-wallet',
    name: 'Trust Wallet',
    icon: <IconTrustWallet />,
    url: 'https://trustwallet.com/',
  },
  {
    key: 'safe-pal',
    name: 'SafePal',
    icon: <IconSafePal />,
    url: 'https://www.safepal.com/',
  },
  {
    key: 'guarda',
    name: 'Guarda',
    icon: <IconGuarda />,
    url: 'https://guarda.com/',
  },
  {
    key: 'coinbase-wallet',
    name: 'Coinbase Wallet',
    icon: <IconCoinbaseWallet />,
    url: 'https://www.coinbase.com/wallet',
  },
  {
    key: 'coin98',
    name: 'Coin98',
    icon: <IconCoin98 />,
    url: 'https://coin98.com/wallet',
  },
  {
    key: 'phantom',
    name: 'Phantom',
    icon: <IconPhantom />,
    url: 'https://phantom.app/',
  },
  {
    key: 'math-wallet',
    name: 'Math Wallet',
    icon: <IconMathWallet />,
    url: ' https://mathwallet.org/en-us',
  },
];

const Contracts = (props: any) => {
  const [currentWallet, setCurrentWallet] = useState('meta-mask');

  const handleWallet = (wallet: string) => {
    setCurrentWallet(wallet);
  };

  const CurrentIconWallet = useMemo(() => {
    const Wallet = Wallets.find((wallet) => wallet.key === currentWallet);
    if (!Wallet) return null;
    return (
      <Link target='_blank' href={Wallet.url}>
        {Wallet.icon}
      </Link>
    );
  }, [currentWallet]);

  const tokens = props.tokens || [];
  if (tokens.length <= 0) return;
  return (
    <div className='flex items-center gap-4 px-3 py-2 bg-grey-200 rounded'>
      <IconETH />
      <span className='text-sm'>{tokens[0]?.platformName}</span>
      <Popover
        placement='bottom'
        content={<WalletAddress tokens={props.tokens} />}
        overlayClassName={cn(
          '[&_.ant-popover-inner]:overflow-y-auto',
          '[&_.ant-popover-inner]:max-h-[312px]',
          '[&_.ant-popover-inner]:max-w-[355px]'
        )}
      >
        <div>
          <IconCaretDown />
        </div>
      </Popover>
      <Link
        target='_blank'
        href={`${tokens[0]?.explorerUrl}${
          (tokens[0]?.explorerUrl as string)?.slice(-1) === '/' ? '' : '/'
        }${tokens[0]?.address}`}
        className='max-w-[62px] lg:max-w-[124px] cursor-pointer flex items-center'
      >
        <Text
          color='primary'
          ellipsis={{
            open: false,
          }}
        >
          {(tokens[0]?.address as string)?.slice(
            0,
            tokens[0]?.address.length - 6
          )}
        </Text>
        <Text color='primary'>{(tokens[0]?.address as string)?.slice(-6)}</Text>
      </Link>
      <Tooltip
        title={<Text size={12}>Copy Address</Text>}
        overlayClassName='tooltip-light'
      >
        <div
          onClick={() => {
            const isCopied = copyToClipboard(tokens[0]?.address);
            if (isCopied) message.success('Copied');
          }}
          className='cursor-pointer'
        >
          <IconCopy />
        </div>
      </Tooltip>
      <Tooltip
        title={<Text size={12}>Add to MetaMask</Text>}
        overlayClassName='tooltip-light'
      >
        {CurrentIconWallet}
      </Tooltip>
      <Popover
        content={
          <WalletBrand
            currentWallet={currentWallet}
            handleWallet={handleWallet}
          />
        }
        overlayClassName='[&_.ant-popover-inner]:!p-0'
      >
        <div>
          <IconCaretDown />
        </div>
      </Popover>
    </div>
  );
};

export default Contracts;
