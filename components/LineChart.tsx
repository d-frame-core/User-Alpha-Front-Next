/** @format */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function LineChartComponent(data: any) {
  console.log('data in linechart is', data);
  return (
    <div className='md:my-2 my-20 mx-auto w-full md:h-[90%] h-full'>
      <ResponsiveContainer
        width={'100%'}
        height={'100%'}>
        <LineChart
          width={500}
          height={420}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={data.type} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='referral'
            stroke='#F816FD'
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='browserData'
            stroke='#017EFA'
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey={'ads'}
            stroke='#1DCE79'
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='survey'
            stroke='#F6294E'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
