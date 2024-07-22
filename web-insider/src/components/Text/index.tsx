'use client';
import { cn } from '@/helpers/functions';
import { TooltipProps, Typography } from 'antd';
import { RenderFunction } from 'antd/es/_util/getRenderPropValue';
import { TextProps } from 'antd/es/typography/Text';
import { ClassValue } from 'class-variance-authority/dist/types';
import { FC, ReactNode, Ref, forwardRef, memo, useMemo } from 'react';

type TText = {
  weight?:
    | 'extraLight'
    | 'extraLightItalic'
    | 'light'
    | 'lightItalic'
    | 'regular'
    | 'mediumItalic'
    | 'semiBold'
    | 'semiBoldItalic'
    | 'bold'
    | 'boldItalic'
    | 'extraBold'
    | 'extraBoldItalic';
  size?: number;
  lineHeight?: number;
  maxWidth?: number;
  color?:
    | 'white'
    | 'black'
    | 'parent'
    | 'primary'
    | 'success'
    | 'danger'
    | boolean;
  hoverColor?: 'primary' | 'parent' | boolean;
  noChildrenStyle?: true;
  className?: ClassValue;
  children: ReactNode | RenderFunction;
  capitalize?: true;
  ellipsis?: TooltipProps | true;
  wrap?: true | 'pretty';
  ref?: Ref<HTMLSpanElement>;
} & Omit<TextProps, 'ellipsis'>;
const Text: FC<TText> = forwardRef<HTMLSpanElement, TText>(
  (
    {
      weight,
      size = 14,
      lineHeight = 20,
      maxWidth = '100%',
      className,
      children,
      color,
      hoverColor,
      noChildrenStyle,
      capitalize,
      type,
      ellipsis,
      wrap,
      ...rest
    },
    ref
  ) => {
    const ClassName = useMemo(() => {
      let weightClass = '!font-jm';
      if (weight === 'extraLight') weightClass = '!font-jel';
      if (weight === 'extraLightItalic') weightClass = '!font-jeli';
      if (weight === 'light') weightClass = '!font-jl';
      if (weight === 'lightItalic') weightClass = '!font-jli';
      if (weight === 'regular') weightClass = '!font-jr';
      if (weight === 'mediumItalic') weightClass = '!font-jmi';
      if (weight === 'semiBold') weightClass = '!font-jsb';
      if (weight === 'semiBoldItalic') weightClass = '!font-jsbi';
      if (weight === 'bold') weightClass = '!font-jb';
      if (weight === 'boldItalic') weightClass = '!font-jbi';
      if (weight === 'extraBold') weightClass = '!font-jeb';
      if (weight === 'extraBoldItalic') weightClass = '!font-jebi';

      let colorClass = '';
      if (color === 'white') colorClass = '!text-white';
      if (color === 'black') colorClass = '!text-black';
      if (color === 'parent') colorClass = '!text-[inherit]';
      if (color === 'primary') colorClass = '!text-[#6B79FF]';
      if (color === 'success') colorClass = '!text-[#1AB369]';
      if (color === 'danger') colorClass = '!text-[#FA3363]';
      if (type === 'secondary') colorClass = '!text-[#9FA4B7]';

      let noChildrenStyleClass = '';
      if (noChildrenStyle)
        noChildrenStyleClass = '[&>*]:!p-0 [&>*]:!m-0 [&>*]:!font-[inherit]';

      let capitalizeClass = '';
      if (capitalize) capitalizeClass = '!capitalize';

      let hoverColorClass = '';
      if (hoverColor === 'primary') hoverColorClass = 'hover:!text-[#5766ff]';

      let wrapClass = '!whitespace-nowrap';
      if (wrap === 'pretty') wrapClass = '!text-pretty';
      if (wrap === true) wrapClass = '';

      return cn(
        className,
        weightClass,
        colorClass,
        noChildrenStyleClass,
        capitalizeClass,
        hoverColorClass,
        wrapClass
      );
    }, [
      className,
      weight,
      color,
      noChildrenStyle,
      capitalize,
      hoverColor,
      type,
      wrap,
    ]);

    const Ellipsis = useMemo(() => {
      if (!ellipsis) return ellipsis;

      let title = (title: any) => (
        <Text size={12} wrap>
          {title}
        </Text>
      );

      const initEllipsis: TooltipProps = {
        title: title(children),
        overlayClassName: 'tooltip-light',
      };

      if (ellipsis === true) return initEllipsis;

      if (ellipsis.title) initEllipsis.title = title(ellipsis.title);

      return {
        ...initEllipsis,
        ...ellipsis,
      };
    }, [ellipsis]);

    return (
      <Typography.Text
        {...rest}
        ref={ref}
        style={{
          fontSize: size,
          lineHeight: `${lineHeight}px`,
          maxWidth,
        }}
        ellipsis={
          Ellipsis && {
            tooltip: Ellipsis,
          }
        }
        className={ClassName}
      >
        {children}
      </Typography.Text>
    );
  }
);

export default memo(Text);
