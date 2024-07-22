import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { FC, HTMLProps, memo } from 'react';

type TTabButton = {
  disabled?: boolean;
  active: boolean;
  title: string;
} & Omit<HTMLProps<HTMLButtonElement>, 'type' | 'className'>;
const TabButton: FC<TTabButton> = ({ disabled, active, title, ...props }) => {
  return (
    <button
      {...props}
      type='button'
      disabled={!!disabled}
      className={cn(
        'px-5 py-3 rounded-lg opacity-50',
        'border-[1.5px] border-[#E5E6EB]',
        !!disabled && 'cursor-not-allowed',
        active &&
          cn(
            'bg-gradient-to-l from-[#547AFF] to-[#4551DE]',
            'opacity-100 border-none'
          )
      )}
    >
      <Text color={active ? 'white' : undefined}>{title}</Text>
    </button>
  );
};

export default memo(TabButton);
