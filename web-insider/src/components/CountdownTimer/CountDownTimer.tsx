'use client';

import { cn } from '@/helpers/functions';
import React, { useEffect, useState } from 'react';
import { ICountdownTimerProps, TimeLeft } from './CountDownTimer.type';
import TimeItem from './TimeItem/TimeItem';

const CountdownTimer: React.FC<ICountdownTimerProps> = ({
  targetDate,
  countDownName,
  className,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {
      y: 0,
      M: 0,
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };

    if (difference > 0) {
      timeLeft.d = Math.floor(difference / (1000 * 60 * 60 * 24));

      // Calculate months (approximately)
      timeLeft.M = Math.floor(timeLeft.d / 30);

      // Calculate years (approximately)
      timeLeft.y = Math.floor(timeLeft.M / 12);

      // Adjust days for remaining months and years
      timeLeft.d -= timeLeft.M * 30;
      timeLeft.M -= timeLeft.y * 12;

      // Calculate hours, minutes, and seconds
      timeLeft.h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      timeLeft.m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft.s = Math.floor((difference % (1000 * 60)) / 1000);
    }

    return timeLeft;
  };

  const [remainingTime, setRemainingTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { y, M, d, h, m, s } = remainingTime;

  return (
    <div className={cn('max-w-[210px]', className)}>
      {countDownName ? (
        <h4 className='font-jsb text-grey-700 text-center mb-1'>
          {countDownName}
        </h4>
      ) : (
        ''
      )}
      <div className='flex items-start justify-center gap-1'>
        {y && y > 0 ? (
          <>
            <TimeItem time={y} name={'Y'} />
            <div className='flex justify-center items-center h-8'>:</div>
          </>
        ) : (
          ''
        )}
        {M && M > 0 ? (
          <>
            <TimeItem time={M} name={'M'} />
            <div className='flex justify-center items-center h-8'>:</div>
          </>
        ) : (
          ''
        )}
        {d && d > 0 ? (
          <>
            <TimeItem time={d} name={'D'} />
            {!(y && y > 0) ? (
              <div className='flex justify-center items-center h-8'>:</div>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        {!(y && y > 0) ? (
          <>
            <TimeItem time={h} name={'H'} />
            {!(M && M > 0) ? (
              <div className='flex justify-center items-center h-8'>:</div>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        {!(M && M > 0) ? (
          <>
            <TimeItem time={m} name={'M'} />
            {!(d && d > 0) ? (
              <div className='flex justify-center items-center h-8'>:</div>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        {!(d && d > 0) ? (
          <>
            <TimeItem time={s} name={'S'} />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
