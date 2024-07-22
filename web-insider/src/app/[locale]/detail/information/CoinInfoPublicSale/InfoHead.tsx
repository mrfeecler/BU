import { IconBell, IconSave } from '@/assets/icons';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { IDetail } from '@/models/IDetail';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Flex, Popover, Tooltip } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import Categories from '../popup/categories/Categories';
import IntroduceCoin from '../popup/introduce-coin/IntroduceCoin';

type TInfoHead = {
  data: IDetail;
};
const InfoHead: FC<TInfoHead> = ({ data }) => {
  return (
    <Flex justify='space-between'>
      <Flex gap={16} align='center'>
        <Popover content={<IntroduceCoin data={data} />}>
          <img
            src={changeImageUrl(data?.image?.x150)}
            alt={data?.name}
            width={76}
            height={76}
            className='rounded-full min-w-[76px] max-w-[76px]'
          />
        </Popover>
        <Flex gap={8} align='center'>
          <Popover content={<IntroduceCoin data={data} />}>
            <Text weight='bold' size={24} lineHeight={32}>
              {data?.name}
            </Text>
          </Popover>
          <Tag>
            <Text size={12} type='secondary'>
              {data?.symbol}
            </Text>
          </Tag>
        </Flex>
      </Flex>
      <Flex vertical justify='space-between' align='flex-end'>
        <Flex gap={16}>
          <Tooltip
            title={<Text size={12}>Add to Watchlist</Text>}
            overlayClassName='tooltip-light'
          >
            <button
              disabled
              className={cn(
                'action p-2 rounded border opacity-50',
                'border-grey-300 cursor-not-allowed'
              )}
            >
              <IconSave />
            </button>
          </Tooltip>
          <Tooltip
            title={<Text size={12}>Edit</Text>}
            overlayClassName='tooltip-light'
          >
            <button
              disabled
              className={cn(
                'action p-2 rounded border opacity-50',
                'border-grey-300 cursor-not-allowed'
              )}
            >
              <PencilSquareIcon className='w-5 h-5' />
            </button>
          </Tooltip>
          <Tooltip
            title={<Text size={12}>Price Alert</Text>}
            overlayClassName='tooltip-light'
          >
            <button
              disabled
              className={cn(
                'action p-2 rounded border opacity-50',
                'border-grey-300 cursor-not-allowed'
              )}
            >
              <IconBell />
            </button>
          </Tooltip>
        </Flex>
        <Flex gap={8}>
          <Text weight='semiBold' type='secondary'>
            Categories
          </Text>
          <Flex gap={4}>
            <Link href={`/en/categories/${data?.categoryId}`} target='_blank'>
              <Tag>
                <Text size={12} type='secondary'>
                  {data?.category}
                </Text>
              </Tag>
            </Link>

            {data?.subCategories?.slice(0, 2)?.map((item: any) => (
              <Tag>
                <Text size={12} type='secondary'>
                  {item.name}
                </Text>
              </Tag>
            ))}

            {data?.subCategories?.length > 3 && (
              <Popover
                placement='bottomRight'
                content={<Categories data={data} />}
              >
                <Tag>
                  <Text size={12} color='primary'>
                    See All
                  </Text>
                </Tag>
              </Popover>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoHead;
