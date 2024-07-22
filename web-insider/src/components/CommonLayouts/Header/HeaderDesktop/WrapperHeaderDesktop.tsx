import React from 'react';
import { useTranslations } from 'next-intl';

interface ChildComponentProps {
  t: any;
}

interface WrapperHeaderDesktopProps {
  children: React.ReactElement<ChildComponentProps>[];
}

export const WrapperHeaderDesktop: React.FC<WrapperHeaderDesktopProps> = ({
  children,
}) => {
  const t = useTranslations('Header');

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { t });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};
