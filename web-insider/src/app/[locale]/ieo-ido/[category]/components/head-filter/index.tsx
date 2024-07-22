'use client';
import { Button, Flex, Segmented } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import './styles.scss';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import Text from '@/components/Text';
import { useRouter } from 'next/navigation';
import { IeoIdoCategory, getCategoryTags } from '../../config';
import { IIeoIdoFilterType } from '../../types';
import SelectProject from '../select-project';

type PropsType = {
  onFilter: (filter: IIeoIdoFilterType) => void;
  setHost?: (value: string) => void;
  params: {
    category: string;
    locale: string;
  };
};

export default function HeadFilter(props: PropsType) {
  const { onFilter, params, setHost } = props;
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const { category = IeoIdoCategory.upcoming, locale } = params;

  const router = useRouter();

  const tags = getCategoryTags();

  const handleFilter = () => {
    onFilter({ search_key: selectedProjects });
  };

  const submitFilter = (value: string[]) => {
    setSelectedProjects(value);
    onFilter({ search_key: value });
  };

  const selectPlaceholder =
    category === IeoIdoCategory.topIdoLaunchpads
      ? 'Filter Launchpads'
      : 'Filter Projects';

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            disabled={tag.disabled}
            key={tag.value}
            className={clsx(category === tag.value && 'active')}
            onClick={() => router.push(`/${locale}/ieo-ido/${tag.value}`)}
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap' align='center' className='relative'>
        <SelectProject
          placeholder={selectPlaceholder}
          category={category}
          onFilterChange={submitFilter}
        />
        <Button
          // disabled={selectedProjects.length === 0}
          disabled
          className='!bg-white !text-grey-500 !h-[44px]'
          size='large'
          onClick={handleFilter}
        >
          <Flex align='center' gap={8}>
            <IconFilterCoinTab />
            <Text type='secondary' className={'text-[#E5E6EB] !text-[14px]'}>Filter</Text>
          </Flex>
        </Button>

        {category === IeoIdoCategory.upcoming && (
          <Segmented
            className='lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%]'
            size='large'
            options={['All', 'Hot']}
            onChange={(value) => {
              setHost?.(value.toString().toLowerCase());
            }}
          />
        )}
      </Flex>
    </Flex>
  );
}
