import { cx } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/dist/types';
import { twMerge } from 'tailwind-merge';

function getImageType(base64String: string) {
  const decodedData = atob(base64String);
  const uintArray = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; i++) {
    uintArray[i] = decodedData.charCodeAt(i);
  }

  // Check for PNG signature
  if (
    uintArray.length > 8 &&
    uintArray[0] === 137 &&
    uintArray[1] === 80 &&
    uintArray[2] === 78 &&
    uintArray[3] === 71 &&
    uintArray[4] === 13 &&
    uintArray[5] === 10 &&
    uintArray[6] === 26 &&
    uintArray[7] === 10
  ) {
    return 'png';
  }

  // Check for SVG declaration
  const svgRegex = /<svg.*?>/i;
  if (svgRegex.test(decodedData)) {
    return 'svg';
  }

  // If neither PNG nor SVG, return null or handle accordingly
  return null;
}

export function changeImageUrl(logo: string) {
  if (!logo) return '';
  try {
    if (logo.includes('https://') || logo.includes('http://')) {
      return logo;
    } else {
      if (logo.includes('data:image/')) {
        return logo;
      }

      const type = getImageType(logo);
      if (type === 'svg') {
        return `data:image/svg+xml;base64,${logo}`;
      }

      return `data:image/png;base64,${logo}`;
    }
  } catch (error) {
    console.log('logo', logo);
    return '';
  }
}

export function getValue(obj: any, path: string) {
  const keysArray = path.split('.');
  let newObject = JSON.parse(simpleStringify(obj));
  for (let i = 0; i < keysArray.length; i++) {
    if (typeof newObject[keysArray[i]] === undefined) {
      return newObject[keysArray[i]];
    }
    newObject = newObject[keysArray[i]];
  }
  return newObject;
}

function simpleStringify(object: any) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == 'object') {
      continue;
    }
    if (typeof object[prop] == 'function') {
      continue;
    }
    //@ts-ignore
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

export function caculatorAverage24h(price: any, histPrice: any) {
  try {
    if (price && histPrice) {
      const currentPrice = price ? price['USD'] : 0;
      const usdHistPrice = histPrice ? histPrice['24H']['USD'] : 0;
      const average = (currentPrice - usdHistPrice) / usdHistPrice;
      return average;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(cx(inputs));
};

export const copyToClipboard = (text: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return true;
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.error('Unable to copy to clipboard', e);
      return false;
    }
    document.body.removeChild(el);
    return true;
  }
};

type TDollarFormatOptions = {
  removeSymbol?: boolean;
  maxDigits?: number;
};
export const dollarFormat = (value: number, options?: TDollarFormatOptions) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: options?.maxDigits || 2,
  });
  let formattedValue = formatter.format(value);

  if (options?.removeSymbol) formattedValue = formattedValue.replace('$', '');

  return formattedValue;
};
