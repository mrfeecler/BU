import { ISearchFilter } from '@/app/home/coin/props';
import FilterCustom from '@/components/FilterCustom';
import { IOptionAny, IOptionCustom } from '@/components/FilterCustom/props';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { FetchSearchTokenUnlock } from '@/usecases/token-unlock';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Checkbox, Flex, Select, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';

type TData = {
  id: string;
  label: string;
  icon: string;
  value: string;
};

type UsHeaderProps = {
  defaultValues?: TData[];
  onFilter?: (values: any[]) => void;
};

export const UsHeader = (props: UsHeaderProps) => {
  const { onFilter } = props;

  const [data, setData] = useState<TData[]>([]);
  const [dataSelected, setDataSelected] = useState<IOptionCustom[]>([]);

  const _renderActiveTag = () => {
    const preview = dataSelected.slice(0, 3);
    const isMore = dataSelected.length > 3;
    return (
      <Flex gap={4} wrap={'wrap'}>
        {preview.map((item, index) => (
          <Tag
            className={'filter-tag'}
            closeIcon={<CloseCircleOutlined />}
            onClose={() => handleRemoveTag(index)}
            key={item.key}
          >
            <img
              src={changeImageUrl(item.image)}
              alt={'icon-select'}
              width={24}
              height={24}
            />
            {item.name}
          </Tag>
        ))}
        {isMore && (
          <Tag className={'filter-tag'}>+{dataSelected.length - 3}</Tag>
        )}
      </Flex>
    );
  };

  const handleRemoveTag = (indexRemove: number) => {
    const newStage = dataSelected.filter(
      (_item, index) => index !== indexRemove
    );
    setDataSelected(newStage);
  };

  const initRef = useRef(false);
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }
    onFilter?.(dataSelected);
  }, [dataSelected]);

  const _renderOption = ({ name, code, checked, image }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <Flex
          className='mx-0 select-coin-custom__item'
          align='center'
          justify='space-between'
          gap={8}
        >
          <img src={changeImageUrl(image)} width={24} height={24} alt={name} />
          <Text className='grow'>{name}</Text>
          {!checked ? (
            <Checkbox  className='custom-checkbox' />
          ) : null}
        </Flex>
      </Select.Option>
    );
  };

  const _renderTag = () => {
    return <></>;
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await FetchSearchTokenUnlock({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      ...e,
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  const _onChange = (_value: string[], optionSelect: any) => {
    setDataSelected(optionSelect);
  };

  return (
    <Flex align={'center'} wrap={'wrap'} gap={10} className={'us-header'}>
      <FilterCustom
        placeholder='Filter Launchpads'
        renderOption={_renderOption}
        renderTag={_renderTag}
        onChange={_onChange}
        getData={_getData}
        isSortSelected='oldToNew'
        value={dataSelected}
      />
      {!!dataSelected.length && <div className='border-l border-gray-300 w-[1px] h-[44px] mx-[12px]'></div>}
      {_renderActiveTag()}
    </Flex>
  );
};
