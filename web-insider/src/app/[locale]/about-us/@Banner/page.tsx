'use client';
import IconDoubleChevron from '@/assets/icons/about-us/IconDoubleChevron';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import Image from 'next/image';

const Banner = () => {
  const goToMeetTheTeam = () => {
    const element = document.getElementById('meet-the-team');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Flex
      align='center'
      justify='center'
      className={cn(
        'relative bg-[url("/about-us/banner.png")]',
        'w-full h-[640px] bg-cover bg-no-repeat bg-center'
      )}
    >
      <Flex vertical align='center' gap={24}>
        <Text
          size={32}
          lineHeight={40}
          weight='bold'
          className='!text-[#FCFCFD]'
        >
          Meet Our Sponsor
        </Text>
        <Image
          src='/about-us/ok-link.png'
          alt='ok-link'
          width={486}
          height={97}
          quality={100}
        />
      </Flex>
      <IconDoubleChevron
        onClick={goToMeetTheTeam}
        className={cn('absolute bottom-4 left-1/2 cursor-pointer')}
      />
    </Flex>
  );
};

export default Banner;
