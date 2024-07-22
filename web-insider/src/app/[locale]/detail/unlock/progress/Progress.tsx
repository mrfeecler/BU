import IconCircle from '@/assets/icons/IconCircle';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import Text from '@/components/Text';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import { cn } from '@/helpers/functions';
import moment from 'moment';
import { useMemo } from 'react';

const Progress = ({ tokenInfo, data }: any) => {
  if (!data) return;

  const TotalRemainingTime = useMemo(() => {
    if (!data.totalRemainingTime) return '';

    const now = Number(moment().format('X'));
    const target = Number(moment(data.totalRemainingTime).format('X'));
    const isPast = now >= target;
    const between = isPast ? now - target : target - now;

    const value = moment.duration(between, 'seconds').asDays();

    let symbol = '';
    if (isPast) symbol = value > 1 ? ' days ago' : ' day ago';
    else symbol = value > 1 ? ' days left' : ' day left';

    return (
      <Text size={20} lineHeight={28} type='secondary'>
        {value.toFixed(0)}
        {symbol}
      </Text>
    );
  }, [data.totalRemainingTime]);

  const date = new Date(data.remainingTime || Date.now);
  const unlockPercent: number = data.totalUnlockedPercent || 0;
  const lockedPercent: number = data.totalLockedPercent || 0;
  const nextUnlockPercent: number = data.totalNextUnlockPercent;
  const nextUnlockToken =
    (data.unlockedTokens || 0 * nextUnlockPercent || 0) / unlockPercent || 1;

  const processNextUnlockPercent =
    parseFloat(unlockPercent + '') + parseFloat(nextUnlockPercent + '');

  return (
    <div className='box-shadow-common p-4 mb-6'>
      <div className='flex items-center justify-center gap-2 border-b border-grey-300 pb-4 mb-4'>
        <span className='text-grey-700 font-bold text-xl'>
          Total Unlock Progress
        </span>
        <span className='text-grey-500 font-medium text-xl'>
          {TotalRemainingTime}
        </span>
      </div>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div
          className={cn(
            'w-full ',
            !!data?.totalNextUnlockPercent && 'xl:max-w-[750px]'
          )}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <IconCircle color='#5766FF' />
              <Text weight='bold' size={16} lineHeight={24}>
                Unlocked
              </Text>
              <Text weight='bold' size={16} lineHeight={24}>
                {currencyFormat(data.totalUnlockedPercent, '%', {
                  numberRound: 2,
                  symbolLast: true,
                })}
              </Text>
            </div>
            <div className='flex items-center gap-3'>
              <IconCircle color='#E5E6EB' />
              <Text weight='bold' size={16} lineHeight={24}>
                Locked
              </Text>
              <Text weight='bold' size={16} lineHeight={24}>
                {currencyFormat(data.totalLockedPercent, '%', {
                  numberRound: 2,
                  symbolLast: true,
                })}
              </Text>
            </div>
          </div>
          <div className='py-2 relative'>
            <div
              className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
              style={{ width: data.totalUnlockedPercent + '%' }}
            ></div>
            <div
              className='next-lock absolute top-1/2 left-0 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10'
              style={{
                width: unlockPercent ? processNextUnlockPercent + '%' : 0,
              }}
            ></div>
            <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
          </div>
          <div className='flex items-center justify-between flex-wrap'>
            <Text type='secondary'>
              {tokenInfo.symbol} {currencyFormat(data?.totalUnlockedToken, '')}
              <span> ~ </span>
              {currencyFormat(data?.totalUnlockedValue, '$')}
            </Text>
            <Text type='secondary'>
              {tokenInfo.symbol} {currencyFormat(data?.totalLockedToken, '')}
              <span> ~ </span>
              {currencyFormat(data?.totalLockedValue, '$')}
            </Text>
          </div>
        </div>

        {!!data?.totalNextUnlockPercent && (
          <div className='md:flex items-center justify-between gap-9 mx-auto xl:mx-0'>
            <div className='w-full mb-4'>
              <div className='flex items-center justify-center gap-3'>
                <IconCircle />
                <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                  Next Unlock
                </span>
                <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                  {percentFormat(data?.totalNextUnlockPercent, '', {
                    noStyle: true,
                    noPlus: true,
                  })}
                </span>
              </div>
              <div className='text-grey-500 text-sm'>
                {tokenInfo.symbol}{' '}
                {nFormatter(data?.totalNextUnlockToken, 2, '')} ~{' '}
                {nFormatter(
                  data?.totalNextUnlockToken * tokenInfo.price,
                  2,
                  '$'
                )}{' '}
                (
                {nFormatter(
                  (data?.totalNextUnlockToken * tokenInfo.price * 100) /
                    (tokenInfo.marketCap / tokenInfo.price),
                  2,
                  ''
                )}
                % of M.Cap)
              </div>
            </div>
            <CountdownTimer targetDate={date} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
