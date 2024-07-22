'use client';
import IconLinkedIn from '@/assets/icons/about-us/IconLinkedIn';
import IconTwitter from '@/assets/icons/about-us/IconTwitter';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Col, Flex, Pagination, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { MeetTheTeams } from './Data';

const MeetTheTeam = () => {
  const [page, setPage] = useState(1);

  const PaginationData = useMemo(() => {
    return MeetTheTeams.slice((page - 1) * 12, page * 12);
  }, [page]);

  const handlePage = (page: number) => setPage(page);

  return (
    <Flex id='meet-the-team' vertical gap={32}>
      <Flex vertical align='center' gap={24}>
        <Flex justify='center' gap={8}>
          <Text weight='bold' size={32} lineHeight={40}>
            Meet the
          </Text>
          <Text weight='bold' size={32} lineHeight={40} color='primary'>
            Team
          </Text>
        </Flex>
        <Text
          wrap='pretty'
          weight='light'
          size={24}
          lineHeight={30}
          className={'text-center'}
        >
          Meet the people behind the product. The BlockUltra team is a close
          knit group of people working towards the same goal in the crypto space
        </Text>
      </Flex>
      <Row gutter={[32, 32]} justify={'start'}>
        {PaginationData.map(
          ({ key, name, avatar, position, linkedIn, twitter }) => {
            return (
              <Col key={key} lg={6} sm={12} xs={24}>
                <Flex
                  vertical
                  align='center'
                  gap={32}
                  className={cn(
                    'rounded-[18px] shadow-[0px_0px_25px_0px_#547AFF1F]',
                    'px-5 py-[26px]'
                  )}
                >
                  <Flex vertical gap={12} align='center'>
                    <Image
                      src={avatar}
                      alt={name}
                      quality={100}
                      width={128}
                      height={128}
                      className='rounded-full h-32 object-cover'
                    />
                    <Flex vertical align='center' gap={4}>
                      <Text weight='bold' size={18} lineHeight={24}>
                        {name}
                      </Text>
                      <Text weight='light' size={18} lineHeight={24}>
                        {position}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex gap={32}>
                    <Link
                      href={linkedIn || '#'}
                      target='_blank'
                      className={cn(!linkedIn && 'cursor-default')}
                    >
                      <IconLinkedIn fill={linkedIn && 'primary'} />
                    </Link>
                    <Link
                      href={twitter || '#'}
                      target='_blank'
                      className={cn(!twitter && 'cursor-default')}
                    >
                      <IconTwitter fill={twitter && 'primary'} />
                    </Link>
                  </Flex>
                </Flex>
              </Col>
            );
          }
        )}
      </Row>
      <Flex justify='center'>
        <Pagination
          current={page}
          pageSize={12}
          total={MeetTheTeams.length}
          onChange={handlePage}
          showSizeChanger={false}
          className={cn(
            '[&_.ant-pagination-item-active]:!bg-[#5766FF]',
            '[&_.ant-pagination-item-active]:!border-none',
            '[&_.ant-pagination-item-active_a]:!text-[#FCFCFD]'
          )}
        />
      </Flex>
    </Flex>
  );
};

export default MeetTheTeam;
