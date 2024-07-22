import Text from '@/components/Text';
import { Flex } from 'antd';
import './style.scss';

export interface IRangeKolPops {
  value: number;
  valueChange: number;
}
export const RangeKolsComponent = (props: IRangeKolPops) => {
  const { value, valueChange } = props;

  const getRangeValue = () => {
    if (value < 100) return [0, 99, 0];
    if (value < 500) return [100, 499, 20];
    if (value < 1000) return [500, 999, 40];
    if (value < 2000) return [1000, 1999, 60];
    return [2000, 4999, 80];
  };

  const _getPercent = () => {
    const [min, max, startPercent] = getRangeValue();
    let percent = ((value - min) / (max - min)) * 20;

    if (max === 4999 && percent > 15)
      return `calc(${startPercent + percent}% - 11px)`;

    if (min === 0 && percent < 5)
      return `calc(${startPercent + percent}% - 3px)`;

    return `calc(${startPercent + percent}% - 6px)`;
  };

  const _renderValueChange = () => {
    const inNegative = valueChange < 0;
    const valueString = inNegative ? valueChange : '+' + valueChange;
    return (
      <Text size={12} className={`${inNegative ? 'down' : 'up'} value-change`}>
        {valueString}
      </Text>
    );
  };
  return (
    <div className='slider-top-kol w-[230px]'>
      <Flex gap={4} align='center' className='slider-top-kol-header'>
        <Text weight='bold' className='value'>
          {value}
        </Text>
        {_renderValueChange()}
      </Flex>
      <div className=' relative'>
        <div className='slider-container'>
          <div className='slider-range'>
            <div className='absolute z-10 item-range left-[20%]'></div>
            <div className='absolute z-10 item-range left-[40%]'></div>
            <div className='absolute z-10 item-range left-[60%]'></div>
            <div className='absolute z-10 item-range left-[80%]'></div>
          </div>
        </div>
        <div className='slider'>
          <div className='gradient bg'></div>
          <div className='gradient'></div>
        </div>
        <div className='sub-title'>
          <Text size={12} type='secondary' className='w-12 item-0'>
            0
          </Text>
          <Text size={12} type='secondary' className='w-12 item-20'>
            100
          </Text>
          <Text size={12} type='secondary' className='w-12 item-40'>
            500
          </Text>
          <Text size={12} type='secondary' className='w-12 item-60'>
            1000
          </Text>
          <Text size={12} type='secondary' className='w-12 item-80'>
            2000
          </Text>
        </div>
        <div
          className='thumb'
          style={{
            left: _getPercent(),
          }}
        ></div>
      </div>
    </div>
  );
};
