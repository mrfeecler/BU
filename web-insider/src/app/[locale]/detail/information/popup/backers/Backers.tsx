import { IconArrowRight } from '@/assets/icons';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Flex, Popover } from 'antd';
import { useParams, useRouter } from 'next/navigation';

const Backers = (props: any) => {
  const backers = props.backers;
  const hasDetail = props.hasDetail;

  const params = useParams<{ locale: string }>();

  if (!backers) return;
  if (backers.length <= 0) return;
  const backerExtend = backers.slice(3);

  const handleGoToDetail = (id: number, name: string) => {
    window.open(
      window.location.origin +
        `/${params.locale}/fundraising/funding-rounds/detail/${id}`
    );
  };

  return (
    <div>
      {backers && backers.length > 0 ? (
        <Flex vertical gap={8}>
          <Text size={12} type='secondary'>
            Backers
          </Text>
          <Flex className='gap-4 xl:gap-5'>
            {...Array.from(Array(3).keys()).map((item) => {
              return (
                <div key={item} className={backers[item] ? '' : 'hidden'}>
                  {backers[item]?.logo && (
                    <img
                      src={changeImageUrl(backers[item]?.logo)}
                      width={28}
                      height={28}
                      alt='backers-1'
                      key={item}
                      onClick={() =>
                        handleGoToDetail(backers[item]?.id, backers[item]?.name)
                      }
                      className='cursor-pointer'
                    />
                  )}
                </div>
              );
            })}
            {backers && backers.length > 3 ? (
              <Popover
                content={
                  <DialogBackers backers={backerExtend} hasDetail={hasDetail} />
                }
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-7 h-7 rounded-full',
                    'bg-grey-300 text-xs font-semibold text-grey-700',
                    'text-center cursor-pointer'
                  )}
                >
                  <Text weight='semiBold' size={12}>
                    +{backers.length - 3}
                  </Text>
                </span>
              </Popover>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
      ) : (
        ''
      )}
    </div>
  );
};

export function DialogBackers(props: any) {
  const params = useParams<{ locale: string }>();
  const backers = props.backers;
  const hasDetail = props.hasDetail;
  const router = useRouter();

  const handleGoToDetail = (id: number, name: string) => {
    window.open(
      window.location.origin +
        `/${params.locale}/fundraising/funding-rounds/detail/${id}`
    );
  };

  const handleActiveFundraising = () => {
    router.push(
      window.location.origin +
        window.location.pathname +
        '?tab=fundraising&target=backer',
      {
        scroll: false,
      }
    );
  };

  return (
    <Flex vertical gap={8}>
      <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
        {...Array.from(Array(backers.length).keys()).map((item) => {
          return (
            <img
              src={changeImageUrl(backers[item]?.logo)}
              width={28}
              height={28}
              alt='backers-1'
              key={item}
              onClick={() =>
                handleGoToDetail(backers[item]?.id, backers[item]?.name)
              }
              className='cursor-pointer'
            />
          );
        })}
      </div>
      {hasDetail && (
        <Flex justify='center'>
          <Flex
            gap={4}
            className='text-[#5766FF] cursor-pointer'
            onClick={handleActiveFundraising}
          >
            <Text color='parent'>Detail</Text>
            <IconArrowRight fill='#5766FF' />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Backers;
