import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { cn, dollarFormat } from '@/helpers/functions';
import { IDetail } from '@/models/IDetail';
import { Col, Flex, Row } from 'antd';
import moment from 'moment';
import { FC, memo, useMemo } from 'react';
import Contracts from '../Contracts';
import Backers from '../popup/backers/Backers';
import Links from '../popup/links/Links';

type TInfoBody = {
  data: IDetail;
};
const InfoBody: FC<TInfoBody> = ({ data }) => {
  const IeoIdoPriceFormat = useMemo(() => {
    if (data.publicSale?.ieoido_price)
      return dollarFormat(data.publicSale?.ieoido_price);
    return '-';
  }, [data]);

  const InitCapPriceFormat = useMemo(() => {
    if (data.initialMarketCap) return dollarFormat(data.initialMarketCap);
    return '-';
  }, [data]);

  const InitSupplyPriceFormat = useMemo(() => {
    if (data.initialSupply)
      return (
        `${data.symbol || ''} ` +
        dollarFormat(data.initialSupply, { removeSymbol: true })
      );
    return '-';
  }, [data]);

  return (
    <Flex vertical gap={16}>
      <Row wrap gutter={[40, 40]}>
        <Col span={14}>
          <Row gutter={60} wrap>
            <Col span={8}>
              <Flex vertical gap={32}>
                <Flex vertical gap={4}>
                  <Text type='secondary'>{data.publicSale?.type} Price</Text>
                  <Text weight='bold' size={24} lineHeight={32}>
                    {IeoIdoPriceFormat}
                  </Text>
                </Flex>
                <Flex vertical gap={4}>
                  <Text type='secondary'>Initial Cap</Text>
                  <Text weight='bold' size={24} lineHeight={32}>
                    {InitCapPriceFormat}
                  </Text>
                </Flex>
              </Flex>
            </Col>
            <Col span={10}>
              <Flex vertical gap={32}>
                <Flex vertical gap={4}>
                  <Text type='secondary'>Goal</Text>
                  <Text weight='bold' size={24} lineHeight={32}>
                    -
                  </Text>
                </Flex>
                <Flex vertical gap={4}>
                  <Text type='secondary'>Initial Circ. Supply</Text>
                  <Text weight='bold' size={24} lineHeight={32}>
                    {InitSupplyPriceFormat}
                  </Text>
                </Flex>
              </Flex>
            </Col>
            <Col span={6}>
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <Text>{data.publicSale?.type || ''}</Text>
                  <Tag
                    radius={false}
                    bg='#1AB369'
                    className={'!rounded-[48px] !py-[2px] !px-2'}
                  >
                    <Text color='white' size={12}>
                      Upcoming
                    </Text>
                  </Tag>
                </Flex>
                <Flex vertical>
                  <Text type='secondary'>Start</Text>
                  <Text weight='bold'>
                    {data.publicSale?.time_start
                      ? moment(data.publicSale?.time_start).format('DD/MM/YYYY')
                      : '-'}
                  </Text>
                </Flex>
                <Flex vertical>
                  <Text type='secondary'>End</Text>
                  <Text weight='bold'>
                    {data.publicSale?.time_end
                      ? moment(data.publicSale?.time_end).format('DD/MM/YYYY')
                      : '-'}
                  </Text>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Flex vertical gap={8}>
            <Text weight='bold' size={16} lineHeight={24}>
              What is {data.name} ?
            </Text>
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
      </Row>
      <Flex
        wrap='wrap'
        align='center'
        className='gap-4 xl:gap-8 2xl:gap-[110px]'
      >
        {data?.tokens && data?.tokens.length > 0 && (
          <Flex vertical gap={8}>
            <Text size={12} type='secondary'>
              Contracts
            </Text>
            <Contracts tokens={data?.tokens} />
          </Flex>
        )}

        <Flex wrap='wrap' className='gap-4 md:gap-8 xl:gap-[110px]'>
          <Links links={data?.links} />
          <Backers backers={data?.backers} hasDetail={!!data?.fundraisings} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(InfoBody);
