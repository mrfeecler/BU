'use client';
import IconBackTop from '@/assets/icons/home/IconBackTop';
import { cn } from '@/helpers/functions';
import { FloatButton } from 'antd';

const ButtonBackTop = () => {
  return (
    <FloatButton.BackTop
      icon={<IconBackTop />}
      className={cn(
        '!w-[60px] !h-[60px] !bg-[rgb(34,37,48,0.60)]',
        '[&_.ant-float-btn-body]:!bg-transparent',
        '[&_.ant-float-btn-icon]:!w-auto'
      )}
    />
  );
};

export default ButtonBackTop;
