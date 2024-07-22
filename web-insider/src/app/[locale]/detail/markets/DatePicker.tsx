import { IconArrowRight, IconCalendar } from '@/assets/icons';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { memo } from 'react';

const { RangePicker } = DatePicker;

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

export function BUDatePicker({ _onRangeDateChange }: any) {
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      _onRangeDateChange(dateStrings[0], dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };
  return (
    <RangePicker
      suffixIcon={<IconCalendar width={20} height={20} fill='#9FA4B7' />}
      separator={
        <div>
          <IconArrowRight fill='#9FA4B7' width={16} height={16} />
        </div>
      }
      presets={rangePresets}
      onChange={onRangeChange}

      className='!px-4 !py-3 !font-jm rangeDateBU'
    />
  );
}

export default memo(BUDatePicker);
