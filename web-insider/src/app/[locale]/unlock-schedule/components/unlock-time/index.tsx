import { currencyFormat, nFormatter } from '@/helpers';
import { changeImageUrl } from '@/helpers/functions';
import moment from 'moment';
import Link from 'next/link';
import { TUnlockTime } from '../../types';

type UnlockTimeProps = TUnlockTime;

export const UnlockTime = (props: UnlockTimeProps) => {
  const { title, money, coins = [] } = props;

  return (
    <div className={'box-shadow-common rounded'}>
      <div className='border-b flex items-center justify-center gap-4 py-2 px-6'>
        <div className='text-grey-700 text-base font-medium'>{title}</div>
        <div className='text-grey-700 text-xl font-bold font-jb'>
          {parseFloat(money) > 0
            ? currencyFormat(parseFloat(money), '$')
            : `$ 0`}
        </div>
      </div>

      <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 lg:gap-y-8 gap-x-8 2xl:gap-x-[144px]'>
        {coins.map((item, index) => (
          <div
            className='flex items-center justify-between flex-wrap gap-6'
            key={index}
          >
            <Link href={`/en/detail/${item.key}?tab=unlock`}>
              <div className='flex gap-2 items-center flex-wrap cursor-pointer'>
                {item?.image ? (
                  <img
                    src={changeImageUrl(item.image)}
                    width={32}
                    height={32}
                    alt={'coin-icon'}
                  />
                ) : (
                  ''
                )}
                <div className='text-grey-500 text-sm font-bold font-jb'>
                  {item.symbol}L
                </div>
              </div>
            </Link>
            <div className='flex gap-2 items-center flex-wrap'>
              <div className='text-grey-700 text-sm font-bold font-jb'>
                {nFormatter(Number(item.price), 2, '$')}
              </div>
              <div className='text-grey-500 text-sm font-medium font-jm'>
                {item?.nextUnlockDate
                  ? moment(item?.nextUnlockDate).format('DD/MM/YYYY')
                  : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
