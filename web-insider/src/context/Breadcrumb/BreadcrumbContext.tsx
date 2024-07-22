import { createContext } from 'react';

export type TBreadcrumb = { title: string; url?: string; onClick?: () => void };

export type TBreadcrumbContext = {
  breadcrumbs: TBreadcrumb[];
  handleBreadcrumb: (
    breadcrumbs: TBreadcrumb[],
    option?: {
      resetData?: boolean;
      holdData?: number;
    }
  ) => void;
};
const BreadcrumbContext = createContext<TBreadcrumbContext>({
  breadcrumbs: [],
  handleBreadcrumb: () => {},
});

export default BreadcrumbContext;
