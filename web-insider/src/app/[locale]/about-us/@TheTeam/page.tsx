import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import Image from 'next/image';

const TheTeam = () => {
  return (
    <Flex
      
      vertical
      className={cn(
        'bg-gradient-to-b from-[#5766FF] from-[74%]',
        'via-white via-[74%] px-5'
      )}
    >
      <Flex
        vertical
        gap={32}
        align='center'
        className='max-w-[1120px] mx-auto py-16'
      >
        <Text weight='bold' size={60} lineHeight={76} color='white'>
          The Team
        </Text>
        <Text
          wrap
          weight='light'
          size={24}
          lineHeight={30}
          className={'!text-gray-100 text-center'}
        >
          Become the leading information platform in Vietnam and top 2 globally
          in the Crypto market
        </Text>
      </Flex>
      <Flex justify='center' className='max-w-[928px] mx-auto'>
        <Image
          width={928}
          height={488}
          sizes='100vw'
          style={{
            width: '100%',
            height: 'auto',
          }}
          src='/about-us/the-team.png'
          alt='the-team'
          className={cn('border-4 border-solid border-white', 'rounded-[36px]')}
        />
      </Flex>
    </Flex>
  );
};

export default TheTeam;
