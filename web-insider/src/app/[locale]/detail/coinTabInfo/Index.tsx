import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { Tabs } from 'antd';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Overview } from '../overview';
import { Socials } from '../socials';
import './index.scss';

const IEOIDODetail = dynamic(() => import('../ieoido'), { ssr: false });
const Unlock = dynamic(() => import('../unlock'), { ssr: false });
const Markets = dynamic(() => import('../markets'), { ssr: false });
const Tokenomics = dynamic(() => import('../tokenomics'), { ssr: false });
const Profile = dynamic(() => import('../profile/Profile'), { ssr: false });
const Fundraising = dynamic(() => import('../fundraising/Fundraising'), {
  ssr: false,
});

const CoinTabInfo = (props: any) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const router = useRouter();
  const locale = useLocale();

  const [activeKey, setActiveKey] = useState('1');

  const { breadcrumbs, handleBreadcrumb } = useContext(BreadcrumbContext);

  const IsListing = useMemo(
    () => !props?.data?.marketDataNotAvailable,
    [props]
  );

  const handleActiveKey = (key: string) => {
    const findTab = tabs.find((t) => t.id === key && !t.disable);
    const label = findTab?.label;
    if (!label) return;
    let url = `/${locale}/detail/${props.slug}`;
    if (key !== '1')
      url += `?tab=${
        typeof label === 'string' ? label?.toLowerCase() : 'customize'
      }`;
    router.push(url);
  };

  const data = props?.data;
  const tabs = [
    {
      id: '1',
      label: 'Overview',
      disable: !IsListing,
      component: <Overview data={props.data} />,
    },
    {
      id: '2',
      label: 'Markets',
      disable: !IsListing,
      component: <Markets slug={props.slug} />,
    },
    {
      id: '3',
      label: 'Profile',
      component: <Profile />,
    },
    {
      id: '4',
      disable: data?.fundraisings ? false : true,
      label: 'Fundraising',
      component: <Fundraising data={props.data} slug={props.slug} />,
    },
    {
      id: '5',
      disable: data?.ieoido ? false : true,
      label: 'IDO/IEO',
      component: <IEOIDODetail data={props.data} slug={props.slug} />,
    },
    {
      id: '6',
      disable: data?.tokenomics ? false : true,
      label: 'Tokenomics',
      component: <Tokenomics tokenInfo={props.data} slug={props.slug} />,
    },
    {
      id: '7',
      disable: data?.unlocks ? false : true,
      label: 'Unlock',
      component: <Unlock tokenInfo={props.data} slug={props.slug} />,
    },
    {
      id: '8',
      disable: true,
      label: 'On-Chain',
      component: '',
    },
    {
      id: '9',
      label: 'Socials',
      component: <Socials />,
    },
    {
      id: '10',
      disable: true,
      label: 'Reviews',
      component: '',
    },
    {
      id: '11',
      disable: true,
      label: (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z'
            fill='#9FA4B7'
          />
          <path
            d='M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z'
            fill='#9FA4B7'
          />
          <path
            d='M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z'
            fill='#9FA4B7'
          />
          <path
            d='M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z'
            fill='#9FA4B7'
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const urlTab = tab?.toLowerCase();
    const findTab = tabs.find(
      (t) =>
        (typeof t.label === 'string' ? t.label.toLowerCase() : 'customize') ===
          urlTab && !t.disable
    );
    const firstNonDisableTab = tabs.find((t) => !t.disable);
    const findDefaultTab =
      tabs.find((t) => t.id === '1' && !t.disable) || firstNonDisableTab;
    const key = findTab?.id || findDefaultTab?.id || '1';
    
    let label = 'Overview';
    if (!!findTab?.label)
      if (typeof findTab?.label === 'string') label = findTab?.label;
      else label = 'Customize';
    else if (typeof findDefaultTab?.label === 'string')
      label = findDefaultTab?.label;
    else label = 'Customize';

    if (breadcrumbs.length >= 3 && activeKey !== key) {
      let newBreadcrumbs = breadcrumbs.slice(2, 3);
      if (tab) {
        newBreadcrumbs = [
          ...newBreadcrumbs.map((val) => ({
            ...val,
            url: window.location.origin + window.location.pathname,
          })),
          {
            title: label,
          },
        ];
      }
      setActiveKey(key);
      handleBreadcrumb(newBreadcrumbs, {
        holdData: 2,
      });
    }
  }, [tab, breadcrumbs, activeKey]);

  return (
    <div className='detail-tab'>
      <div>
        <Tabs
          tabPosition={'top'}
          activeKey={activeKey}
          onChange={handleActiveKey}
          items={tabs?.map((tab) => {
            return {
              label: tab.label,
              key: tab.id,
              disabled: !!tab.disable,
              children: tab.component,
            };
          })}
        />
      </div>
    </div>
  );
};

export default memo(CoinTabInfo);
