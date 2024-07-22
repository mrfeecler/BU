import { IconExport } from '@/assets/icons';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Button, Divider, Flex } from 'antd';

const TierSystem = () => {
  const data = [
    {
      heading: 'Lottery',
      items: [
        'Tier 0:-',
        'Tier 1:-',
        'Tier 2:-',
        'Tier 3:-',
        'Tier 4:-',
        'Tier 5:-',
      ],
    },
    {
      heading: 'Guaranteed',
      items: ['Tier 6:-', 'Tier 7:-', 'Tier 8:-', 'Tier 9:-', 'Tier 10:-'],
    },
  ];

  return (
    <section
      className={cn(
        'grid p-4 gap-4 md:p-6 lg:px-[8.4%] container-shadow',
        'lg:flex lg:gap-[113px] lg:justify-around'
      )}
    >
      <Flex vertical gap={12} align='center' justify='center'>
        <Text weight='bold' size={20} lineHeight={28}>
          Tier System
        </Text>

        <Button
          className={cn(
            '!h-11 !rounded-lg !text-[#6B79FF] !cursor-not-allowed',
            '!border-[1.5px] !border-solid !border-[#6B79FF] !opacity-50'
          )}
        >
          <Flex gap={8} align='center'>
            <Text className={'!text-[#5766FF]'}>Resource</Text>
            <IconExport />
          </Flex>
        </Button>
      </Flex>

      <Divider
        type='vertical'
        className='!w-full !h-[1px] lg:!w-[1px] lg:!h-auto !border-[#E5E6EB] !m-0'
      />

      <Flex vertical gap={32} flex={1}>
        {data.map((item, index) => (
          <Flex vertical gap={16} key={index}>
            <Text weight='bold'>{item.heading}</Text>
            <ul className='grid grid-cols-3 gap-3'>
              {item.items.map((tier, tierIndex) => (
                <li key={tierIndex} className='flex'>
                  <Text weight='bold'>• {tier}</Text>
                </li>
              ))}
            </ul>
          </Flex>
        ))}
      </Flex>
    </section>
  );
};

export default TierSystem;
