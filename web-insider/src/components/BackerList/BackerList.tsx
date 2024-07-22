import IconCrown from '@/assets/icons/IconCrown';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Badge, Flex, Modal, Tooltip } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo, useState } from 'react';

const BackerList = ({
  backers,
  initNumber,
  type,
  hasTier = false,
  modalTier = false,
  onMore,
}: any) => {
  const [showMore, setShowMore] = useState(false);
  const visibleItems = backers?.slice(0, initNumber);

  const LeadBacker: any[] = useMemo(() => {
    return backers?.filter((item: any) => item.type === 'LEAD');
  }, [backers]);

  const OtherBacker: any[] = useMemo(() => {
    return backers?.filter((item: any) => item.type !== 'LEAD');
  }, [backers]);

  const handleCancel = () => {
    setShowMore(false);
  };

  return (
    <div>
      {backers && (
        <div>
          <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
            {visibleItems?.map((item: any, index: any) => {
              return <BackerItem key={index} item={item} hasTier={hasTier} />;
            })}
            {backers?.length > initNumber && (
              <button onClick={() => (onMore ? onMore() : setShowMore(true))}>
                {' '}
                <span className='text-primary-500'>
                  + {backers?.length - initNumber} {type}
                </span>
              </button>
            )}
          </div>
          <Modal
            title={
              <Text capitalize weight='bold' size={20} lineHeight={28}>
                {type}
              </Text>
            }
            open={showMore}
            onCancel={handleCancel}
            footer={false}
            styles={{
              header: {
                paddingTop: 20,
                paddingLeft: 24,
                paddingRight: 24,
                marginBottom: 24,
              },
              content: {
                overflow: 'hidden',
                padding: 0,
                maxHeight: 648,
              },
              body: {
                paddingBottom: 20,
                paddingLeft: 24,
                paddingRight: 20,
                marginRight: 4,
                overflowY: 'auto',
                height: 'auto',
                maxHeight: 572,
              },
            }}
            classNames={{
              content: 'modal-scroll',
            }}
          >
            <Flex vertical gap={24}>
              {!!LeadBacker.length && (
                <Flex vertical gap={16}>
                  <Text weight='bold'>Lead</Text>
                  <Flex vertical gap={16}>
                    {LeadBacker.map((item, i) => (
                      <BackerItem
                        key={i}
                        item={item}
                        imageSize={32}
                        hasTier={modalTier}
                      />
                    ))}
                  </Flex>
                </Flex>
              )}
              <Flex vertical gap={16}>
                {!!LeadBacker.length && <Text weight='bold'>Other</Text>}
                <Flex vertical gap={16}>
                  {OtherBacker.map((item, i) => (
                    <BackerItem
                      key={i}
                      item={item}
                      imageSize={32}
                      hasTier={modalTier}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Modal>
        </div>
      )}
    </div>
  );
};

export const BackerItem = ({ item, imageSize = 48, hasTier = false }: any) => {
  const locale = useLocale();

  const Logo = useMemo(() => {
    if (item?.logo) {
      const LogoItem = (
        <Link
          target='_blank'
          href={`/${locale}/fundraising/top-backers/detail/${item.slug}`}
        >
          <Image
            src={changeImageUrl(item?.logo)}
            height={imageSize}
            width={imageSize}
            alt={item.name}
          />
        </Link>
      );
      if (item?.type === 'LEAD')
        return (
          <Badge
            color='#ffffff'
            count={
              <Flex
                align='center'
                justify='center'
                className={cn(
                  'bg-white rounded-full',
                  'border-[0.5px] border-solid border-[#E7E7E7]',
                  imageSize === 48 ? 'w-4 h-4' : 'w-3 h-3'
                )}
              >
                <Tooltip
                  title={<Text size={12}>Lead</Text>}
                  overlayClassName='tooltip-light'
                >
                  <div>
                    <IconCrown />
                  </div>
                </Tooltip>
              </Flex>
            }
            offset={[imageSize === 48 ? -8 : -6, imageSize === 48 ? 6 : 4]}
          >
            {LogoItem}
          </Badge>
        );
      return LogoItem;
    }
    return null;
  }, [item]);

  return (
    <Flex gap={12} align='center'>
      {Logo}
      <Flex vertical gap={4}>
        <Link
          target='_blank'
          href={`/${locale}/fundraising/top-backers/detail/${item.slug}`}
        >
          <Text>{item.name}</Text>
        </Link>
        {hasTier && item.tier && (
          <Link target='_blank' href={`/${locale}/fundraising/top-backers`}>
            <Tag>
              <Text type='secondary' size={12}>
                Tier {item.tier}
              </Text>
            </Tag>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(BackerList);
