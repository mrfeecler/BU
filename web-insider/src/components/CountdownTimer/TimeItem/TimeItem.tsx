import React, { useEffect, useState } from 'react';
import { ITimeItemProps } from './TimeItem.type';

const TimeItem: React.FC<ITimeItemProps> = ({ time, name }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <div className=''>
          <div className='font-jsb text-grey-700 w-[42px] bg-grey-200 flex items-center justify-center p-1 font-semibold rounded text-base'>
            {time}
          </div>
          <div className='font-jb text-grey-500 text-center font-bold'>
            {name}
          </div>
        </div>
      )}
    </>
  );
};

export default TimeItem;
