'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { TimeLeft } from '@/components/CountdownTimer/CountDownTimer.type';
import './index.scss'

const FundraisingEvent = () => {

  const targetDate = new Date('2024-04-17T09:00:00.000Z')
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

  const { d, h, m, s } = remainingTime;

  return (
    <div className='fundraising-event fixed inset-0 z-[10000] bg-white p-6'>
      <div className="logo">
        <Link href={'/'}>
          <Image src={'/logoBU.svg'} width={131} height={31} alt='Logo' />
        </Link>
      </div>
        <div className="grid grid-cols-2 w-full items-center justify-center gap-[50px] mt-6 lg:mt-10">
          <div className='col-span-2 md:col-span-1 md:p-6'>
            <div className="text-primary-500 font-bold font-jb text-2xl md:text-5xl mb-8">
              End of fundraising later....
            </div>
            <div className="flex items-end gap-2 md:gap-4 mb-10">
              <div className='text-center'>
                <div className="font-sm text-grey-500 text-sm">Days</div>
                <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">{d}</div>
              </div>
              <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">:</div>
              <div className='text-center'>
                <div className="font-sm text-grey-500 text-sm">Hours</div>
                <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">{h}</div>
              </div>
              <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">:</div><div className='text-center'>
                <div className="font-sm text-grey-500 text-sm">Minutes</div>
                <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">{m}</div>
              </div>
              <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">:</div>
              <div className='text-center'>
                <div className="font-sm text-grey-500 text-sm">Seconds</div>
                <div className="font-bold font-jb text-3xl md:text-5xl xl:text-7xl text-grey-700">
                  {s}
                </div>
              </div>
            </div>
            <div className="border border-grey-300 p-6 rounded-3xl text-center">
              <div className="text-2xl md:text-5xl text-[#9C9AB6] mb-4">Raise</div>
              <div className="text-primary-500 font-bold font-jb text-2xl md:text-5xl mb-8">
                $6,162 / 1.5M (0.41%)
              </div>
            </div>
          </div>
          <div className='col-span-2 md:col-span-1 p-6 '>
            <Image src={'/fundraising-event.svg'} width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }} alt='Logo' 
            />
          </div>
        </div>
    </div>
  )
}

export default FundraisingEvent