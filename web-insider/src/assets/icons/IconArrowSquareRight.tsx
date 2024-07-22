import { FC } from 'react';

type TIconArrowSquareRight = {
  className?: string;
};
const IconArrowSquareRight: FC<TIconArrowSquareRight> = ({ className }) => {
  return (
    <svg
      width='6'
      height='10'
      viewBox='0 0 6 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1.33398 8.66659L4.66732 4.99992L1.33398 1.33325'
        stroke='#9FA4B7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconArrowSquareRight;
