import { IconDown } from '@/assets/icons/home/IconDown';
import { IconUp } from '@/assets/icons/home/IconUp';
import { Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table/interface';
import { round } from 'lodash';
import { ReactNode } from 'react';
import { cn, dollarFormat } from './functions';

const recursiveZero: (num: number, digits: number) => string = (
  num,
  digits
) => {
  const numNumber = Number(num);
  if (numNumber === 0) return '0';
  const numFixed = round(numNumber, digits);
  if (numFixed === 0) return recursiveZero(num, digits + 1);
  return numFixed.toString();
};

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const renderSortIcon = (props: any) => {
  if (!props.sortOrder) return <></>;
  return props.sortOrder === 'ascend' ? <IconUp /> : <IconDown />;
};

interface IoptionCurrencyFormat {
  numberRound?: number;
  symbolLast?: true;
  displayFull?: boolean;
}

export const currencyFormat = (
  value: number,
  currencySymbol: string,
  options?: IoptionCurrencyFormat
) => {
  if (!value) return 0;
  if (options?.displayFull && value >= 1)
    return dollarFormat(value, { maxDigits: 2 });
  if (value >= 1)
    return nFormatter(
      value,
      options?.numberRound || 2,
      currencySymbol,
      options?.symbolLast
    );

  let roundValue = 0;
  let roundValueString = '';
  let roundNumber = options?.numberRound || 3;

  const valueString = value.toString();
  if (valueString.includes('e')) {
    const lastNumber = valueString.split('e')[1];
    roundNumber = Math.abs(Number(lastNumber)) + 1;
  } else {
    while (true) {
      const priceArray = value?.toFixed(roundNumber).split('');
      if (
        !!Number(priceArray[priceArray.length - 3]) &&
        Number(priceArray[priceArray.length - 3]) !== 0
      )
        break;

      roundNumber += 1;
    }
  }

  roundValue = Number(
    dollarFormat(value, { removeSymbol: true, maxDigits: roundNumber })
  );
  roundValueString = value.toFixed(roundNumber);

  while (true) {
    if (roundValueString.slice(-1) === '0')
      roundValueString = roundValueString.slice(0, -1);
    else break;
  }

  if (Math.abs(roundValue) < 0.0001 && Math.abs(value) < 1) {
    let quantity = 3;
    if (roundValueString.slice(-3, -1) === '00') quantity = 2;
    else if (roundValueString.slice(-3, -2) !== '0') quantity = 4;
    return tooltipMaxLength(roundValueString, currencySymbol, quantity);
  }

  return (
    <span className='whitespace-nowrap'>
      {`${!options?.symbolLast ? currencySymbol : ''}${roundValue}${
        options?.symbolLast ? currencySymbol : ''
      }`}
    </span>
  );
};

export const percentFormat: any = (
  value: number,
  className?: string,
  options = {
    precision: 2,
    noSymbol: false,
    noStyle: false,
    noPlus: false,
  }
): string | ReactNode => {
  if (!value) return 0;
  try {
    let roundValue = 0;
    let roundValueString = '';
    if (Math.abs(value) > 1) roundValue = round(value, options?.precision);
    else {
      let roundNumber = options?.precision ?? 2;

      const valueString = value.toString();
      if (valueString.includes('e')) {
        const lastNumber = valueString.split('e')[1];
        roundNumber = Math.abs(Number(lastNumber)) + 1;
      } else {
        while (true) {
          const priceArray = value.toFixed(roundNumber).split('');
          if (
            !!Number(priceArray[priceArray.length - 2]) &&
            Number(priceArray[priceArray.length - 2]) !== 0
          )
            break;

          roundNumber += 1;
        }
      }

      roundValue = round(value, roundNumber);
      roundValueString = value.toFixed(roundNumber);
    }

    let textStyle = 'text-gray-10';
    if (roundValue === 0) {
      textStyle = 'text-gray-500';
    } else if (roundValue > 0) {
      textStyle = 'text-sp-green-500';
    } else {
      textStyle = 'text-red-500';
    }

    while (true) {
      const lastRoundValue = roundValueString.slice(-1);
      if (lastRoundValue === '0')
        roundValueString = roundValueString.slice(0, -1);
      else break;
    }

    if (Math.abs(roundValue) < 0.0001 && Math.abs(value) < 1) {
      let quantity = 3;
      if (roundValueString.slice(-3, -1) === '00') quantity = 2;
      return tooltipMaxLength(
        roundValueString,
        options?.noSymbol ? '' : '%',
        quantity,
        true,
        options.noStyle ? undefined : textStyle,
        options.noPlus
      );
    }

    return (
      <p
        className={`${
          !options.noStyle && textStyle
        } whitespace-nowrap ${className}`}
      >
        {value >= 0 && !options.noPlus ? '+' : ''}
        {roundValue !== 0 ? roundValue : '0.00'}
        {options?.noSymbol ? '' : '%'}
      </p>
    );
  } catch (error) {
    return 'N/A';
  }
};

export const percentFormat2 = (value: number, className?: string) => {
  if (!value) {
    return '-';
  }
  try {
    const roundValue = round(value, 2);
    let textStyle = 'text-gray-10';
    if (roundValue === 0) {
      textStyle = 'text-gray-500';
    } else if (roundValue > 0) {
      textStyle = 'text-sp-green-500';
    } else {
      textStyle = 'text-red-500';
    }

    return (
      <p className={`${textStyle} whitespace-nowrap ${className}`}>
        {value >= 0 ? '+' : ''}
        {roundValue !== 0 ? roundValue : '0.00'}%
      </p>
    );
  } catch (error) {
    return 'N/A';
  }
};

export const nFormatter = (
  num: number,
  digits: number,
  symbol: string,
  positionSymbolEnd?: boolean,
  space?: boolean
) => {
  if (!num || !Number(num)) {
    return '-';
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'Q' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  const price = item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : recursiveZero(num, digits);

  return (
    <span className='whitespace-nowrap'>
      {positionSymbolEnd
        ? price + (space ? ' ' : '') + symbol
        : symbol + (space ? ' ' : '') + price}
    </span>
  );
};

export const nFormatter2 = (
  num: number,
  digits: number,
  symbol: string,
  positionSymbolEnd?: boolean
) => {
  if (!num || !Number(num)) {
    return '-';
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'Q' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  const price = item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : recursiveZero(num, digits);
  return (
    <span className='whitespace-nowrap'>
      {positionSymbolEnd ? price + symbol : symbol + price}
    </span>
  );
};

export const secondsToHms = (d: number | string) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  var mDisplay = m > 0 ? m + ' min ' : '';
  var sDisplay = s > 0 ? s + ' sec ' : '';
  return hDisplay + mDisplay + sDisplay;
};

export const renderRangePaging = (
  page: number,
  pageSize: number,
  dataLength: number,
  total: number
) => {
  const start = (page - 1) * pageSize + 1;
  const end = start + dataLength - 1;
  return (
    <span className='table-total'>
      {start} - {end} from {total}
    </span>
  );
};

export const fancyTimeFormat = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  return {
    hrs,
    mins,
    secs,
  };
};

export * from './countryFlag';

export const convertNumberToThreeDot = (num: any) => {
  let formattedNumber = '';
  const numConvert = num?.toString() || '0';
  if (numConvert.length < 7) {
    formattedNumber = round(num, 4).toString();
  } else {
    const start = numConvert.slice(0, 3);
    const end = numConvert.slice(numConvert.length - 3, numConvert.length);
    formattedNumber = start.concat('...').concat(end);
  }
  return (
    <Tooltip title={num}>
      <span>${formattedNumber}</span>
    </Tooltip>
  );
};

export const tooltipMaxLength = (
  value: string | number,
  symbol: string,
  quantity = 4,
  symbolEnd?: boolean,
  textStyle?: string,
  noPlus?: boolean
) => {
  const isNegativeNumber = Number(value) < 0;
  const valueString = value.toString();
  const start = valueString.slice(0, isNegativeNumber ? 4 : 3);
  const end = valueString.slice(
    valueString.length - quantity,
    valueString.length
  );
  let tooltipData = `${start.concat('...').concat(end)}`;
  if (symbolEnd) tooltipData += symbol;
  else tooltipData = symbol.concat(tooltipData);
  if (symbol === '%' && !isNegativeNumber)
    tooltipData = (!noPlus ? '+' : '') + `${tooltipData}`;
  return (
    <Tooltip title={valueString} overlayClassName='tooltip-light'>
      <span
        className={cn(`whitespace-nowrap`, textStyle)}
      >{`${tooltipData}`}</span>
    </Tooltip>
  );
};

export const getIndexTable = (
  page: number,
  pageSize: number,
  index: number,
  total?: number
) => {
  if (!total) return (+page - 1) * +pageSize + index + 1;
  return total - (page - 1) * pageSize - index;
};

export const renderColumnId = <T = any,>(
  props?: Partial<ColumnType<T>>
): Partial<ColumnType<T>> => {
  const { key = '_index', title = '#' } = props || {};
  return {
    key,
    title,
    width: 24,
    align: 'left',
    fixed: true,
    render: (value) => value._index,
  };
};
