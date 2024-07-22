import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import Image from 'next/image';
import MeetTheTeam from './MeetTheTeam';

const AboutUs = () => {
  return (
    <Flex vertical gap={80} className='max-w-[1180px] mx-auto px-5'>
      <Flex vertical align='center' gap={24}>
        <Flex gap={8}>
          <Text weight='bold' size={32} lineHeight={40}>
            About
          </Text>
          <Text weight='bold' size={32} lineHeight={40} color='primary'>
            us!
          </Text>
        </Flex>
        <Image
          width={928}
          height={488}
          src='/about-us/the-team.png'
          alt='the-team'
          className={cn('rounded-[36px]')}
        />
        <Flex vertical gap={24}>
          <Text wrap='pretty' weight='light' size={24} lineHeight={30}>
            "Welcome to our BlockUltra Team! We are a dedicated and innovative
            group of technologists committed to driving forward the frontiers of
            technology. Our mission is to harness the power of cutting-edge
            advancements to solve complex problems and create transformative
            solutions. With a focus on collaboration and creativity, we strive
            to push boundaries and shape the future of industries. Our direction
            is clear: to pioneer breakthroughs that enhance efficiency,
            connectivity, and sustainability. Join us as we embark on a journey
            to make a meaningful impact through technology.
          </Text>
          <Text wrap='pretty' weight='light' size={24} lineHeight={30}>
            Our vision is to become the leading information providing platform
            in Vietnam and top 2 globally in the Crypto market. We understand
            that technology has the power to reshape industries, improve lives
            and drive sustainable growth. That's why our efforts are guided by
            an steadfast dedication to addressing pressing social needs and
            driving positive change.
          </Text>
          <Text wrap='pretty' weight='light' size={24} lineHeight={30}>
            As we chart our course into the future, our direction remains clear:
            to be at the forefront of technological advancement and innovation.
            Whether we're exploring emerging technologies like artificial
            intelligence, blockchain, or the Internet of Things, our aim is to
            pioneer breakthroughs that redefine the way we live, work, and
            interact with the world."
          </Text>
        </Flex>
      </Flex>
      {/* <Flex vertical gap={32}>
        <Flex justify='center' gap={8}>
          <Text weight='bold' size={32} lineHeight={40} color='primary'>
            Our Impact
          </Text>
          <Text weight='bold' size={32} lineHeight={40}>
            in Number
          </Text>
        </Flex>
        <Row gutter={[50, 32]}>
          {OurImpactInNumber.map(({ key, name, quantity }) => {
            return (
              <Col key={key} lg={8} sm={12} xs={24}>
                <Flex vertical align='center' gap={12}>
                  <Text weight='bold' size={50} lineHeight={63} color='primary'>
                    {quantity}
                  </Text>
                  <Text weight='light' size={32} lineHeight={40}>
                    {name}
                  </Text>
                </Flex>
              </Col>
            );
          })}
        </Row>
      </Flex> */}
      <MeetTheTeam />
    </Flex>
  );
};

export default AboutUs;
