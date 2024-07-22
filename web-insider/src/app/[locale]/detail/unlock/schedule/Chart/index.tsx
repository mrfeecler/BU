'use client';

import SwitchAllocation from '@/components/SwitchAllocation/SwitchAllocation';
import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { nFormatter } from '@/helpers';
import Text from '@/components/Text';


export default function Chart(props: any) {
  const [allocations, setAllocations] = useState<ITokenomics[]>([]);
  const [cirChart, setCirChart] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [time, setTime] = useState([])
  const [name, setName] = useState('')
  const [percent, setPercent] = useState('')

  const [allocationsData, setAllocationsData] = useState(props.data?.chart?.datas?.allocations || [])
  const [scheduleData, setScheduleData] = useState(props.data?.chart?.chart || []);
  
  useEffect(() => {
    let cirChartTemp: any = [];
    let timeTemp: any = [];
    let scheduleTemp = props.data?.chart?.chart || [];
    setScheduleData(scheduleTemp)
    const propAllocation = props.data?.chart?.datas?.allocations || [];
    setAllocationsData(propAllocation)
    if (propAllocation.length > 0) {
      propAllocation.map((item: any, i: number) => {
        cirChartTemp.push({ value: item.tokens_percent, name: item.name });
        item.activeColor = Object.values(COLOR_CHART)[i];
        item.isActive = true;
      })
    }
    if (scheduleTemp.length > 0) {
      scheduleTemp.map((item: any) => {
        item.data = item.tokens
        item.isActive = true
      })
      timeTemp = scheduleTemp[0]?.times && scheduleTemp[0]?.times.length > 0 ? scheduleTemp[0]?.times.map((item: any) => {
        return item = moment(item).format('DD/MM/YYYY')
      }) : []
    }
    setAllocations(propAllocation);
    setSchedule(scheduleTemp);
    setCirChart(cirChartTemp);
    setTime(timeTemp);
    setName(cirChartTemp[0]?.name ?? '')
    setPercent(cirChartTemp[0]?.value ? cirChartTemp[0]?.value + '%' : '')
  },[props])

  const optionPie = useMemo(
    () => ({
      color: [
        COLOR_CHART.BITTER_LEMON,
        COLOR_CHART.MALACHITE,
        COLOR_CHART.PAOLO_VERONESE_GREEN,
        COLOR_CHART.TURQUOISE_SURF,
        COLOR_CHART.CERULEAN_FROST,
        COLOR_CHART.PLUMP_PURPLE,
        COLOR_CHART.PURPUREUS,
        COLOR_CHART.JAZZBERRY_JAM,
        COLOR_CHART.CERISE,
        COLOR_CHART.SUNSET_ORANGE,
      ],
      series: [
        {
          name: 'Token Allocation',
          type: 'pie',
          radius: ['50%', '70%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 3,
          },
          label: {
            show: false,
          },
          showInLegend: false,
          labelLine: {
            show: false,
          },
          data: cirChart,
        },
      ],
    }),
    [cirChart]
  );

  const optionStackArea = useMemo(
    () => ({
      color: [
        COLOR_CHART.BITTER_LEMON,
        COLOR_CHART.MALACHITE,
        COLOR_CHART.PAOLO_VERONESE_GREEN,
        COLOR_CHART.TURQUOISE_SURF,
        COLOR_CHART.CERULEAN_FROST,
        COLOR_CHART.PLUMP_PURPLE,
        COLOR_CHART.PURPUREUS,
        COLOR_CHART.JAZZBERRY_JAM,
        COLOR_CHART.CERISE,
        COLOR_CHART.SUNSET_ORANGE,
      ],
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: time,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: schedule,
    }),
    [cirChart]
  );

  const handler = (e: { _id: string; isActive: boolean }) => {
    let cirChartTemp: any = [];
    let scheduleTemp: any = [];
    const newAllocationsData = cloneDeep(allocationsData);
    let index = newAllocationsData.findIndex((item: any) => item._id === e._id)
    newAllocationsData[index].isActive = !newAllocationsData[index].isActive
    newAllocationsData.map((item: any, i: number) => {
      cirChartTemp.push({ value: item.isActive ? item.tokens_percent : 0 , name: item.name });
      item.activeColor = Object.values(COLOR_CHART)[i];
    })
    setAllocationsData(newAllocationsData)

    const newscheduleData = cloneDeep(scheduleData);
    newscheduleData[index].isActive = !newscheduleData[index].isActive

    setScheduleData(newscheduleData)
    let emptyArr = newscheduleData[0].tokens.map(() => '0')
    scheduleTemp = newscheduleData;
    scheduleTemp.map((item: any) => {
      item.data = item.isActive ? item.tokens : emptyArr
    })
    let firstItem = allocationsData.find((item: any) => item.isActive === true)
    if (firstItem) {
      setName(firstItem.name || '')
      setPercent(firstItem.tokens_percent ? firstItem.tokens_percent + '%' : '')
    } else {
      setName('')
      setPercent('')
    }
    setCirChart(cirChartTemp);

    setSchedule(pre => cloneDeep(scheduleTemp).map((d: any)=>{
      const newData : any[] =  cloneDeep(d);
      return ({...newData});
    }));
  };

  const handleMouseOverChart = (param: any) => {
    setName(param.name)
    setPercent(param.percent ? param.percent + '%' : '')
  };

  const ChartPie = useMemo(() => {
    return (
      <ReactECharts
        option={optionPie}
        onEvents={{
          mouseover: handleMouseOverChart,
        }}
      />
    );
  }, [optionPie]);

  return (
    <div className='token grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <div className='allocation'>
        <div className='text-grey-700 text-sm font-bold font-jb mb-5'>
          Token ABC
        </div>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='relative'>
            {ChartPie}
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
              <div className='text-grey-700 text-xl font-jm font-medium'>
                <Text
                  weight='bold'
                  size={20}
                  lineHeight={28}
                  ellipsis={{ open: false }}
                  maxWidth={100}
                >
                  {name}
                </Text>
              </div>
              <div className='text-grey-500 text-sm font-jm font-medium'>
                {percent}
              </div>
            </div>
          </div>
          <div className='note min-w-[300px]'>
            {allocations && allocations.length > 0
              ? allocations.map((item, index) => {
                  return (
                    <div
                      className='flex items-center justify-between gap-4 mb-6'
                      key={index}
                    >
                      <SwitchAllocation
                        _id={item._id}
                        isActive={item.isActive}
                        title={item.name}
                        activeColor={item.activeColor}
                        onChange={(e: any) => handler(e)}
                      />
                      <div className='flex items-center justify-between gap-4 max-w-[125px] w-full'>
                        <div className='text-grey-700 text-medium text-xs'>
                          {nFormatter(item.tokens, 2, props.tokenInfo.symbol)}
                        </div>
                        <div className='text-grey-500 text-medium text-xs'>
                          {nFormatter(item.tokens_percent, 2, '%')}
                        </div>
                      </div>
                    </div>
                  );
                })
              : 'Không có dữ liệu'}
          </div>
        </div>
      </div>
      <div className='vesting-schedule'>
        <div className='flex items-center justify-between'>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Release Schedule
          </div>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Today, 21 Apr 2023
          </div>
        </div>
        {
          schedule && schedule.length > 0 ? (
            <ReactECharts option={optionStackArea} notMerge={true} />
          ) : ''
        }
      </div>
    </div>
  );
}
