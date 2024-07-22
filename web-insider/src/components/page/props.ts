import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  classnames?: string;
  contentClassnames?: string;
  breadcrumbWrapperClassnames?: string;
}>;
