import { Flex } from 'antd';
import { FC, ReactNode } from 'react';

type TLayoutAboutUs = {
  TheTeam: ReactNode;
  AboutUs: ReactNode;
  Banner: ReactNode;
};
const LayoutAboutUs: FC<TLayoutAboutUs> = ({ TheTeam, AboutUs, Banner }) => {
  return (
    <Flex vertical gap={24} className='pb-16'>
      {Banner}
      {AboutUs}
    </Flex>
  );
};

export default LayoutAboutUs;
