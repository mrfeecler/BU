import { IconCopy } from '@/assets/icons';
import IconETH from '@/assets/icons/IconETH';
import Text from '@/components/Text';
import { copyToClipboard } from '@/helpers/functions';
import { Flex, Tooltip, message } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const WalletAddress = (props: any) => {
  const tokens = props.tokens;
  if (!tokens) return;
  if (tokens.length <= 0) return;
  return (
    <div className='wallet-contract'>
      {...Array.from(Array(tokens.length).keys()).map((item) => {
        return (
          <Flex
            key={item}
            gap={16}
            align='center'
            className='p-3 rounded cursor-pointer hover:bg-grey-200'
          >
            <Flex align='center' gap={8} className='grow'>
              <Flex gap={12} align='center'>
                <IconETH />
                <Text>{tokens[item]?.platformName}</Text>
              </Flex>
              {/* <Tooltip
                title={
                  <Text size={12} wrap>
                    {tokens[item]?.address}
                  </Text>
                }
                overlayClassName='tooltip-light'
              > */}
              <Link
                target='_blank'
                href={`${tokens[item]?.explorerUrl}${
                  (tokens[item]?.explorerUrl as string)?.slice(-1) === '/'
                    ? ''
                    : '/'
                }${tokens[item]?.address}`}
                className='max-w-[115px] flex items-center'
              >
                <Text
                  color='primary'
                  ellipsis={{
                    open: false,
                  }}
                >
                  {(tokens[item]?.address as string)?.slice(
                    0,
                    tokens[item]?.address.length - 6
                  )}
                </Text>
                <Text color='primary'>
                  {(tokens[item]?.address as string)?.slice(-6)}
                </Text>
              </Link>
              {/* </Tooltip> */}
            </Flex>
            <Flex gap={16} align='center'>
              <Tooltip
                title={<Text size={12}>Copy Address</Text>}
                overlayClassName='tooltip-light'
              >
                <div
                  onClick={() => {
                    const isCopied = copyToClipboard(tokens[item]?.address);
                    if (isCopied) message.success('Copied');
                  }}
                >
                  <IconCopy />
                </div>
              </Tooltip>
              <Tooltip
                title={<Text size={12}>Add to MetaMask</Text>}
                overlayClassName='tooltip-light'
              >
                <Image
                  src='/coin-info/metamask.png'
                  width={24}
                  height={24}
                  alt='fox'
                />
              </Tooltip>
            </Flex>
          </Flex>
        );
      })}
    </div>
  );
};

export default memo(WalletAddress);
