import { IDetail } from '@/models/IDetail';
import { Divider, Flex } from 'antd';
import { FC, memo } from 'react';
import InfoBody from './InfoBody';
import InfoHead from './InfoHead';

type TCoinInfoFundraising = {
  data: IDetail;
};
const CoinInfoFundraising: FC<TCoinInfoFundraising> = ({ data }) => {
  return (
    <Flex vertical gap={24} className='container-shadow p-6'>
      <InfoHead data={data} />
      <Divider className='!border-[#E5E6EB] !m-0' />
      <InfoBody data={data} />
    </Flex>
  );
};

export default memo(CoinInfoFundraising);
