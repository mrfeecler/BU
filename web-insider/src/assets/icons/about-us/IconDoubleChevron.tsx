import { Flex, FlexProps } from 'antd';

const IconDoubleChevron = (
  props: Omit<FlexProps, 'vertical' | 'align' | 'children'>
) => {
  return (
    <Flex {...props} vertical align='center'>
      <svg
        height='10'
        width='25'
        fill='none'
        viewBox='0 0 25 10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.75 2L12.5 8L23.25 2'
          stroke='#FCFCFD'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
        />
      </svg>
      <svg
        height='10'
        width='31'
        fill='none'
        viewBox='0 0 31 10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.75 2L15.5 8L29.25 2'
          stroke='#FCFCFD'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='3'
        />
      </svg>
    </Flex>
  );
};

export default IconDoubleChevron;
