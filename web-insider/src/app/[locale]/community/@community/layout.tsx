'use client';
import { Flex } from 'antd';
import { FC, ReactNode, memo } from 'react';

type TLayoutCommunity = {
  children: ReactNode;
};
const LayoutCommunity: FC<TLayoutCommunity> = ({ children }) => {
  return (
    <Flex gap={16} className='bg-white p-6'>
      {children}
    </Flex>
  );
};

export default memo(LayoutCommunity);
