import IconDownCoinTab from '@/assets/icons/home/IconDownCoinTab';
import { cn } from '@/helpers/functions';
import { Input, Select, SelectProps } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';
import './styles.scss';
type CustomSelectProps = SelectProps & {
  prefixIcon?: ReactNode;
};

const SelectWrapper = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    left: -4px;
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: 2rem;
    height: 44px;
    max-width: 282px;

    .ant-select-selection-search {
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
    }
  }

  .ant-select .ant-select-arrow {
    transition: transform 0.2s ease-in;
  }
  .ant-select.ant-select-open .ant-select-arrow {
    transform: rotate(180deg);
  }

  .ant-select-selection-placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #D1D2DC;
    margin-left: -4px;
    inset-inline-start: 20px;
    inset-inline-end: 30px;
    font-family: 'Plus Jakarta Sans Regular';
  }

  .ant-select-selection-search {
    margin-left: -1px !important;
  }

  .ant-select-item-option-content:hover {
    background-color: red !important;
  }

  .ant-select-selection-item {
    background: rgb(82 120 248 / 30%) !important;
  }

  .ant-checkbox {
    display: none !important;
  }
`;

const CustomSelect = ({
  prefixIcon,
  children,
  className,
  ...rest
}: CustomSelectProps) => {
  return (
    <SelectWrapper>
      {prefixIcon && <div className='prefix-icon-wrapper'>{prefixIcon}</div>}
      <Select
        suffixIcon={
          <div className='down rotate-180 flex'>
            <IconDownCoinTab />
          </div>
        }
        maxTagCount={3}
        mode='multiple'
        className={cn(
          'select-custom hover:!border-primary-500', 
          '[&_.ant-select-selection-search-input]:!font-jm',
          className
        )}
        {...rest}
      >
        {children}
      </Select>
    </SelectWrapper>
  );
};

export default CustomSelect;
