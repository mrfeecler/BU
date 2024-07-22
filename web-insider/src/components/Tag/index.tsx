import { cn } from '@/helpers/functions';
import { Tag as TagAntd, TagProps } from 'antd';
import { ClassValue } from 'class-variance-authority/dist/types';
import { CSSProperties, FC, ReactNode, memo, useMemo } from 'react';

type TTag = {
  children: ReactNode;
  className?: ClassValue;
  bg?: string;
  radius?: boolean;
} & TagProps;
const Tag: FC<TTag> = ({
  children,
  className,
  bg,
  bordered = false,
  radius = true,
  ...props
}) => {
  const ClassName = useMemo(() => {
    const initClass =
      '!px-2 !py-0 !h-5 !flex !m-0 !items-center !justify-center !w-min';

    let bgClass = '';
    if (!bg) bgClass = '!bg-[#EEF2F6]';

    let radiusClass = '';
    if (radius) radiusClass = '!rounded';

    return cn(className, initClass, bgClass, radiusClass);
  }, [className, bg, radius]);

  const Style = useMemo(() => {
    let style: CSSProperties = {};

    if (bg) style = { background: bg };

    return style;
  }, [bg]);

  return (
    <TagAntd {...props} bordered={bordered} className={ClassName} style={Style}>
      {children}
    </TagAntd>
  );
};

export default memo(Tag);
