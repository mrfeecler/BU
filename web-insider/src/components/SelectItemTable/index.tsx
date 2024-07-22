import Text from '@/components/Text';
import { Select } from 'antd';
import './styles.scss';
interface IProps {
  onChange: (value: number) => void;
  pageSize?: string;
}

const SelectItemTable = ({ onChange, pageSize }: IProps) => {
  const _onChange = (value: string) => {
    onChange(Number(value));
  };

  return (
    <Select
      defaultValue={pageSize?.toString() || '10'}
      onChange={_onChange}
      className='select-count-common !w-[155px] !h-9'
      options={[
        { value: '10', label: <Text weight='semiBold'>Show rows 10</Text> },
        { value: '20', label: <Text weight='semiBold'>Show rows 20</Text> },
        { value: '50', label: <Text weight='semiBold'>Show rows 50</Text> },
        { value: '100', label: <Text weight='semiBold'>Show rows 100</Text> },
      ]}
    />
  );
};
export default SelectItemTable;
