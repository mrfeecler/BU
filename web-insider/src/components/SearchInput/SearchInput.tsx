'use client';

import Text from '@/components/Text';
import { TEXT_RECENT_DATA } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { GlobalSearchCoins } from '@/usecases/common';
import { get, uniqBy } from 'lodash';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import SearchResult from '../SearchResult/SearchResult';
import { ISearchInputProps } from './SearchInput.type';
import './index.scss';
import { IGlobalSearch, IRecent } from './props';

const SearchInput: FC<ISearchInputProps> = ({
  isButton,
  component = 'banner',
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const wrapperRef = useRef(null);
  const debouncedValue = useDebounce<string>(search, 500);
  const [data, setData] = useState<Partial<IGlobalSearch>>({
    categories: [],
    coins: [],
    fundraisings: [],
    trendings: [],
    upcomings: [],
    exchanges: [],
    launchpads: [],
    backers: [],
    unlocks: [],
  });
  const [recents, setRecents] = useState<IRecent[]>([]);

  const useOutsideAlerter = <T extends HTMLElement>(ref: RefObject<T>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsTyping(false);
        } else {
          setIsTyping(true);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleGetDataFilter = () => {
    GlobalSearchCoins({ name: debouncedValue }).then((res: any) => {
      setData(res);

      if (!debouncedValue) return;

      const oneCoin = get(res, 'coins[0]', null);
      const oneTren = get(res, 'trendings[0]', null);

      if (oneCoin || oneTren) {
        recents.push({
          name: get(oneCoin ?? oneTren, 'name', null),
          key: get(oneCoin ?? oneTren, 'key', null),
          icon: get(oneCoin ?? oneTren, 'image.x60', null),
        });

        const recentData = uniqBy(recents, 'key').reverse();

        setRecents(recentData);
        localStorage.setItem(TEXT_RECENT_DATA, JSON.stringify(recentData));
      }
    });
  };

  useEffect(() => {
    handleGetDataFilter();
  }, [debouncedValue]);

  useEffect(() => {
    const jsonData = localStorage.getItem(TEXT_RECENT_DATA);
    if (!jsonData) return;
    try {
      const recentData = JSON.parse(jsonData);
      setRecents(recentData);
    } catch (error) {}
  }, []);

  const _onClearRecent = () => {
    localStorage.removeItem(TEXT_RECENT_DATA);
    setRecents([]);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <div>
      <form ref={wrapperRef}>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative max-w-xl'>
          <div
            className={cn(
              'absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none',
              component === 'header' && 'pl-4'
            )}
          >
            <svg
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z'
                stroke='#9FA4B7'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M22.5 22L20.5 20'
                stroke='#9FA4B7'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <input
            type='search'
            id='search'
            autoComplete='off'
            value={search}
            onChange={(e) => handlerSearch(e)}
            onFocus={() => {
              setIsTyping(true);
              if (search) handleGetDataFilter();
            }}
            className={cn(
              'block w-full pl-12 text-sm text-gray-900 border',
              'custom-placeholder border-gray-300 outline-none',
              'focus:ring-blue-500 focus:border-blue-500',
              component === 'banner'
                ? 'rounded-full py-4 pr-2 pl-16 h-[72px] ' +
                    'font-jm text-base text-[#333747]'
                : 'rounded-lg py-3 pr-4',
              component === 'header' && isTyping && 'focused h-[46px]'
            )}
            placeholder={
              component === 'header'
                ? 'Search'
                : 'Enter Coin, Token, NFT, Category...'
            }
          />
          {isButton ? (
            <button
              className={cn(
                'text-white absolute right-2.5 top-1/2 -translate-y-1/2',
                'focus:ring-4 focus:outline-none font-medium rounded-full',
                'text-sm py-2 search-btn h-14 px-10',
                isTyping && 'hidden'
              )}
            >
              <Text weight='semiBold' size={18} lineHeight={20} color='white'>
                Search
              </Text>
            </button>
          ) : (
            ''
          )}
          <div
            className={cn(
              'absolute bottom-0-0 right-0 pt-[4px]',
              'rounded-lg z-10 w-full',
              isTyping ? 'active' : 'hidden'
            )}
          >
            <SearchResult
              isSearch={!!debouncedValue.length}
              data={data as IGlobalSearch}
              recents={recents}
              onClearRecent={_onClearRecent}
              component={component}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
