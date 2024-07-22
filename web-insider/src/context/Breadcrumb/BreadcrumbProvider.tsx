'use client';
import { FC, ReactNode, memo, useCallback, useState } from 'react';
import BreadcrumbContext, { TBreadcrumb } from './BreadcrumbContext';

type TBreadcrumbProvider = {
  children: ReactNode;
};
const initBreadcrumb = [
  {
    title: 'BlockUltra',
    url: '/',
  },
];
const BreadcrumbProvider: FC<TBreadcrumbProvider> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>(initBreadcrumb);

  const handleBreadcrumb = useCallback(
    (
      newBreadcrumbs: TBreadcrumb[],
      option?: {
        resetData?: boolean;
        holdData?: number;
      }
    ) => {
      const handleCurrBreadcrumb = (currBreadcrumbs: TBreadcrumb[]) => {
        if (option?.holdData) return currBreadcrumbs.slice(0, option?.holdData);

        if (option?.resetData) return initBreadcrumb;

        return currBreadcrumbs;
      };

      const handleNewBreadcrumb = (currBreadcrumbs: TBreadcrumb[]) => {
        if (option?.resetData || option?.holdData) return newBreadcrumbs;

        return newBreadcrumbs.filter((newItem) => {
          return !currBreadcrumbs.some(
            (currItem) =>
              currItem.title.toLowerCase() === newItem.title.toLowerCase()
          );
        });
      };

      setBreadcrumbs((prev) => [
        ...handleCurrBreadcrumb(prev),
        ...handleNewBreadcrumb(prev),
      ]);
    },
    []
  );

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        handleBreadcrumb,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default memo(BreadcrumbProvider);
