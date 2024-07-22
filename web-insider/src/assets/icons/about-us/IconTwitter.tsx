import { useMemo } from 'react';

const IconTwitter = ({ fill = '#333747' }) => {
  const Fill = useMemo(() => {
    if (fill === 'primary') return '#5766FF';
    return fill;
  }, [fill]);

  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.44 7.98953C20.45 8.15953 20.45 8.33953 20.45 8.51953C20.45 13.8595 16.33 20.0095 8.78999 20.0095C6.46999 20.0095 4.31 19.3495 2.5 18.1995C2.83 18.2395 3.15001 18.2495 3.49001 18.2495C5.41001 18.2495 7.17 17.6095 8.58 16.5295C6.78 16.4895 5.27 15.3295 4.75 13.7295C5 13.7695 5.26 13.7895 5.52 13.7895C5.89 13.7895 6.26001 13.7395 6.60001 13.6495C4.72001 13.2695 3.31 11.6495 3.31 9.68953V9.63953C3.86 9.93953 4.49 10.1295 5.16 10.1495C4.06 9.41952 3.33 8.18952 3.33 6.78952C3.33 6.03952 3.53 5.34953 3.89 4.74953C5.91 7.19953 8.94 8.79952 12.34 8.97952C12.28 8.67952 12.24 8.36952 12.24 8.05952C12.24 5.82952 14.07 4.01953 16.34 4.01953C17.52 4.01953 18.59 4.50952 19.33 5.28952C20.26 5.11952 21.14 4.77953 21.93 4.31953C21.63 5.25953 20.98 6.04952 20.13 6.53952C20.95 6.44952 21.75 6.22953 22.49 5.91953C21.93 6.71953 21.23 7.42952 20.43 8.00952L20.44 7.98953Z'
        fill={Fill}
      />
    </svg>
  );
};

export default IconTwitter;
