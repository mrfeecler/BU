'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import './index.scss';

const UnlockTimeTop = dynamic(() => import('./components/unlock-time-top'), {
  ssr: false,
});
const UsTable = dynamic(() => import('./components/us-table'), { ssr: false });

const breadcrumbConfig = [
  {
    title: 'Unlock',
  },
];

export default function UnlockSchedule() {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(() => {
    handleBreadcrumb(breadcrumbConfig, { resetData: true });
  }, []);

  return (
    <Page classnames='unlock-schedule'>
      <UnlockTimeTop />
      <UsTable />
    </Page>
  );
}
