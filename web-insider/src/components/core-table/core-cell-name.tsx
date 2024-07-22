import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { changeImageUrl } from '@/helpers/functions';
import { Avatar, Flex } from 'antd';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';

interface ICoreCellNameProps {
  imagesUrl?: string[];
  name?: string;
  symbol?: string;
  link?: string;
  rightNode?: React.ReactNode;
  labelClassName?: string;
  actionTarget?: HTMLAttributeAnchorTarget;
  maxWidth?: number;
}

export const CoreCellName = (props: ICoreCellNameProps) => {
  const {
    imagesUrl,
    name = 'image',
    symbol,
    link,
    rightNode,
    labelClassName,
    actionTarget = '_blank',
  } = props;
  const ImagesUrl = imagesUrl?.filter((url) => !!url);

  return (
    <Flex align='center' gap={8}>
      {!!ImagesUrl?.length && (
        <Avatar.Group maxCount={3}>
          {ImagesUrl.map((url, index) => (
            <Avatar key={index} size={32} src={changeImageUrl(url)} />
          ))}
        </Avatar.Group>
      )}
      <div className='flex items-center gap-1 justify-start flex-col md:flex-row'>
        <Link href={link || '#'} target={actionTarget}>
          <Text weight='bold' ellipsis className={labelClassName}>
            {name}
          </Text>
        </Link>
        {symbol && (
          <Tag>
            <Text size={12} type='secondary'>
              {symbol}
            </Text>
          </Tag>
        )}
        {rightNode}
      </div>
    </Flex>
  );
};
