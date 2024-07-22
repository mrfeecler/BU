'use client';
import IconArrowSquareRight from '@/assets/icons/IconArrowSquareRight';
import Text from '@/components/Text';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { cn } from '@/helpers/functions';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/navigation';
import { memo, useContext, useMemo } from 'react';
import { PageProps } from './props';

const BasePage = (props: PageProps) => {
  const {
    children,
    classnames,
    contentClassnames = 'pb-6 pt-5',
    breadcrumbWrapperClassnames = 'px-4 md:px-0',
  } = props;

  const router = useRouter();

  const { breadcrumbs } = useContext(BreadcrumbContext);

  const handleClickBreadcrumb = (url: string) => {
    router.push(url);
  };

  const ItemBreadcrumb = useMemo(() => {
    return breadcrumbs.map((item, index) => {
      if (index === breadcrumbs.length - 1) {
        return {
          ...item,
          title: <Text capitalize>{item.title}</Text>,
        };
      }
      return {
        ...item,
        title: (
          <Text
            type='secondary'
            hoverColor='primary'
            onClick={() =>
              item.onClick || (item.url && handleClickBreadcrumb(item.url))
            }
            className={'cursor-pointer'}
          >
            {item.title}
          </Text>
        ),
      };
    });
  }, [breadcrumbs]);

  return (
    <div className={cn('mx-auto max-w-2xl px-4 py-3', classnames)}>
      <div className={breadcrumbWrapperClassnames}>
        <Breadcrumb
          separator={<IconArrowSquareRight className='h-full' />}
          items={ItemBreadcrumb}
        />
      </div>
      <div className={contentClassnames}>{children}</div>
    </div>
  );
};

export default memo(BasePage);
