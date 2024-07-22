import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Flex } from 'antd';

const IntroduceCoin = (props: any) => {
  return (
    <div className='introduce-coin w-full md:w-[380px] font-jm'>
      <div className='flex items-center gap-3 pb-4 mb-4 border-b border-grey-300'>
        <img
          src={changeImageUrl(props.data?.image?.native)}
          alt=''
          width={76}
          height={76}
          className='rounded-full'
        />
        <div className='info'>
          <div className='flex gap-1'>
            <span className='font-bold text-grey-700'>{props.data?.name}</span>
            <IconCheckedCompleted />
          </div>
          <a className='text-primary-500' href='#'>
            @{props.data?.name}
          </a>
        </div>
      </div>
      <div
        className='mb-6 text-sm text-grey-600 max-h-[300px] overflow-y-auto'
        dangerouslySetInnerHTML={{ __html: props.data?.description }}
      ></div>
      <Flex justify='center' className='w-full'>
        <button
          disabled
          className={cn(
            'h-11 px-5 py-3 rounded-lg opacity-50 min-w-[147px]',
            'bg-gradient-to-bl from-[#547AFF] to-[#4551DE]',
            'cursor-not-allowed'
          )}
        >
          <Text className={'!text-[#FCFCFD]'}>Follow</Text>
        </button>
      </Flex>
    </div>
  );
};

export default IntroduceCoin;
