import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import Text from '@/components/Text';
import { currencyFormat, nFormatter } from '@/helpers';
import { Flex, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { round } from 'lodash';
import moment from 'moment';

const Rounds = ({ data, tokenInfo }: any) => {
  if (!data) return;
  const unlocksData = data.unlocks || [];

  // const totalTokens: number =
  //   (dataProps.unlockedTokens * 100) / dataProps.unlockedTokensPercent;

  const columns: ColumnsType<IUnlock> = [
    {
      key: 'rounds',
      title: <Text weight='bold'>Rounds</Text>,
      align: 'left',
      width: 300,
      render: (_, value) => {
        return (
          <Flex vertical gap={8}>
            <Flex gap={4} align='center'>
              <Text weight='bold' ellipsis maxWidth={276}>
                {value.name}
              </Text>
              {value.unlockedPercent === 100 ? (
                <div>
                  <IconCheckedCompleted />
                </div>
              ) : (
                ''
              )}
            </Flex>
            <Flex align='center' gap={4}>
              <Tooltip
                title={<Text size={12}>Allocation</Text>}
                placement='bottom'
                overlayClassName='tooltip-light'
              >
                <Text size={12}>
                  {tokenInfo.symbol} {nFormatter(value.allocation, 2, '')}
                </Text>
              </Tooltip>
              <Tooltip
                placement='bottom'
                trigger={value.allocationPercent ? ['hover'] : []}
                title={
                  <Flex gap={2} align='center'>
                    {currencyFormat(value.allocationPercent, '%', {
                      symbolLast: true,
                    })}
                    <Text size={12}>of Total Supply</Text>
                  </Flex>
                }
                overlayClassName='tooltip-light'
              >
                <Text size={12} type='secondary'>
                  {nFormatter(value.allocationPercent, 2, '')}%
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'unlock',
      title: () => {
        return (
          <Flex align='center' justify='space-between'>
            <Text weight='bold'>Unlocked</Text>
            <Text weight='bold'>Locked</Text>
          </Flex>
        );
      },
      width: 400,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical className='w-full max-w-[400px]'>
            <Flex align='center' justify='space-between'>
              <Tooltip
                trigger={value.unlockedPercent ? ['hover'] : []}
                title={
                  <Flex gap={2} align='center'>
                    {currencyFormat(value.unlockedPercent, '%', {
                      symbolLast: true,
                    })}
                    <Text size={12}>of Allocation</Text>
                  </Flex>
                }
                overlayClassName='tooltip-light'
              >
                <Text weight='semiBold'>
                  {nFormatter(value.unlockedPercent, 2, '%', true)}
                </Text>
              </Tooltip>
              <Tooltip
                trigger={value.lockedPercent ? ['hover'] : []}
                title={
                  <Flex gap={2} align='center'>
                    {currencyFormat(value.lockedPercent, '%', {
                      symbolLast: true,
                    })}
                    <Text size={12}>of Allocation</Text>
                  </Flex>
                }
                overlayClassName='tooltip-light'
              >
                <Text weight='semiBold'>
                  {nFormatter(value.lockedPercent, 2, '%', true)}
                </Text>
              </Tooltip>
            </Flex>
            <div className='py-2 relative'>
              <div
                className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                style={{ width: value.unlockedPercent + '%' }}
              ></div>
              <Tooltip
                trigger={value.nextUnlockPercent ? ['hover'] : []}
                title={
                  <Flex gap={2} align='center'>
                    <Text size={12}>Next Unlock:</Text>
                    {currencyFormat(value.nextUnlockPercent, '%', {
                      symbolLast: true,
                    })}
                    <Text size={12}>of Allocation</Text>
                  </Flex>
                }
                overlayClassName='tooltip-light'
              >
                <div
                  className='next-lock absolute top-1/2 -translate-y-1/2 bg-transparent h-1.5 z-30'
                  style={{
                    width: value.nextUnlockPercent
                      ? value.nextUnlockPercent + '%'
                      : 0,
                    left: `calc(${value.unlockedPercent}% - ${
                      value.nextUnlockPercent + value.unlockedPercent >
                      round(value.nextUnlockPercent + value.unlockedPercent, 0)
                        ? 0
                        : 1
                    }px)`,
                  }}
                />
              </Tooltip>
              <div
                className='next-lock absolute top-1/2 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10'
                style={{
                  width: value.nextUnlockPercent
                    ? value.nextUnlockPercent + value.unlockedPercent + '%'
                    : 0,
                }}
              ></div>
              <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
            </div>
            <Flex wrap='wrap' align='center' justify='space-between'>
              <Text type='secondary' size={12}>
                Start:{' '}
                {value.startDate
                  ? moment(value.startDate).format('DD/MM/YYYY')
                  : '-'}
              </Text>
              <Text type='secondary' size={12}>
                End:{' '}
                {value.endDate
                  ? moment(value.endDate).format('DD/MM/YYYY')
                  : '-'}
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'tgeUnlock',
      title: <Text weight='bold'>TGE Unlock</Text>,
      width: 268,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical gap={8} align='center' className='text-center'>
            <Tooltip
              trigger={value.tgeUnlockPercent ? ['hover'] : []}
              title={
                <Flex gap={2} align='center'>
                  {currencyFormat(value.tgeUnlockPercent, '%', {
                    symbolLast: true,
                  })}
                  <Text size={12}>of Allocation</Text>
                </Flex>
              }
              overlayClassName='tooltip-light'
            >
              <Text weight='semiBold'>
                {value.tgeUnlockPercent ? value.tgeUnlockPercent + '%' : '-'}
              </Text>
            </Tooltip>
            <Text size={12} type='secondary'>
              {value.tgeUnlockToken
                ? nFormatter(value.tgeUnlockToken, 2, '')
                : ''}
            </Text>
          </Flex>
        );
      },
    },
    {
      key: 'nextUnlock',
      title: <Text weight='bold'>Next Unlock</Text>,
      width: 396,
      align: 'center',
      render: (_, value) => {
        const countDownTime = new Date(value.timer);
        const isNextUnlock = !!value.nextUnlockPercent;

        if (value.unlockedPercent === 100)
          return (
            <Flex gap={8} align='center' justify='center' className='w-full'>
              <IconCheckedCompleted />
              <Text weight='bold' color='success'>
                Fully Unlocked
              </Text>
            </Flex>
          );
        return (
          <Flex justify={isNextUnlock ? 'flex-end' : 'center'}>
            {isNextUnlock ? (
              <div className='md:flex items-center gap-7'>
                <Flex vertical gap={8} align='center'>
                  <Tooltip
                    title={
                      <Flex gap={2} align='center'>
                        {currencyFormat(value.nextUnlockPercent, '%', {
                          symbolLast: true,
                        })}
                        <Text size={12}>of Allocation</Text>
                      </Flex>
                    }
                    overlayClassName='tooltip-light'
                  >
                    <Text weight='semiBold'>
                      {currencyFormat(value.nextUnlockPercent, '')}%
                    </Text>
                  </Tooltip>
                  <Text size={12} type='secondary'>
                    {tokenInfo.symbol}{' '}
                    {nFormatter(value?.nextUnlockToken, 2, '')} ~{' '}
                    {nFormatter(value?.nextUnlockValue, 2, '$')} (
                    {nFormatter(
                      (value?.nextUnlockValue * 100) / tokenInfo.marketCap,
                      2,
                      ''
                    )}
                    % of M.Cap)
                  </Text>
                </Flex>
                <CountdownTimer targetDate={countDownTime} className='m-0' />
              </div>
            ) : (
              '-'
            )}
          </Flex>
        );
      },
    },
  ];
  return (
    <div>
      <div className='overflow-x-auto hide-scroll common-table'>
        <Table columns={columns} dataSource={unlocksData} pagination={false} />
      </div>
    </div>
  );
};

export default Rounds;
