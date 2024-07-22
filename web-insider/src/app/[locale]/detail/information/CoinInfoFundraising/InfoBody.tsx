import { IconInfo } from '@/assets/icons';
import IconMarketing from '@/assets/icons/IconMarketing';
import Text from '@/components/Text';
import { cn, dollarFormat } from '@/helpers/functions';
import { IDetail } from '@/models/IDetail';
import { Button, Col, Flex, Row } from 'antd';
import { FC, memo, useMemo } from 'react';
import Backers from '../popup/backers/Backers';
import Links from '../popup/links/Links';

type TInfoBody = {
  data: IDetail;
};
const InfoBody: FC<TInfoBody> = ({ data }) => {
  const TotalRaised = useMemo(() => {
    if (data.totalFundRaised) return dollarFormat(data.totalFundRaised);
    return '-';
  }, [data]);

  const AvgPrice = useMemo(() => {
    if (data.avgPrice) return dollarFormat(data.avgPrice);
    return '-';
  }, [data]);

  return (
    <Flex vertical gap={16}>
      <Row gutter={98} wrap>
        <Col span={4}>
          <Flex vertical gap={32}>
            <Flex vertical gap={4}>
              <Text type='secondary'>Total Raised</Text>
              <Text weight='bold' size={24} lineHeight={32}>
                {TotalRaised}
              </Text>
            </Flex>
            <Flex vertical gap={4}>
              <Text type='secondary'>Avg Price</Text>
              <Text weight='bold' size={24} lineHeight={32}>
                {AvgPrice}
              </Text>
            </Flex>
          </Flex>
        </Col>
        <Col span={14}>
          <Flex vertical gap={8}>
            <Flex align='center' gap={8}>
              <IconInfo />
              <Text weight='bold'>About</Text>
            </Flex>
            <div
              className={cn(
                'list-disc m-0 p-0 text-sm text-ellipsis',
                'text-[#333747] font-jm leading-5 line-clamp-6'
              )}
              dangerouslySetInnerHTML={{
                __html: data.description || '',
              }}
            />
          </Flex>
        </Col>
        <Col span={6}>
          <Flex
            vertical
            gap={16}
            justify='center'
            align='center'
            className='bg-[#5766FF] px-4 py-3 rounded-lg max-w-[263px] ml-auto'
          >
            <Flex gap={12} align='center'>
              <Flex>
                <IconMarketing />
              </Flex>
              <Text color='white' wrap>
                Notify me when this project has an IDO/IEO schedule
              </Text>
            </Flex>
            <Button disabled>
              <Text type='secondary'>Sign in</Text>
            </Button>
          </Flex>
        </Col>
      </Row>
      <Flex
        wrap='wrap'
        align='center'
        className='gap-4 md:gap-8 xl:gap-[110px]'
      >
        <Links links={data?.links} />
        <Backers backers={data?.backers} hasDetail={!!data?.fundraisings} />
      </Flex>
    </Flex>
  );
};

export default memo(InfoBody);
