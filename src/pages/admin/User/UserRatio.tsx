import { DatePickerProps } from 'antd';
import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

// Define the data type for each pie segment
interface PieData {
  name: string;
  value: number;
}

interface CustomLegendProps {
  payload?: any[]; // Recharts provides the payload type
}

// CustomLegend component with types
const CustomLegend: React.FC<CustomLegendProps> = ({ payload = [] }) => {
  return (
    <ul className="mt-4 flex flex-col items-start space-y-2">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center">
          <span
            className="mr-2 inline-block h-3 w-3"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm font-medium text-gray-700">
            {entry.value} ({entry.payload.value}%)
          </span>
        </li>
      ))}
    </ul>
  );
};

const onChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
  console.log(dateString);
  // setYear(dateString);
};

// Main component for the user ratio chart
const UserRatioChart = ({ data }: { data: any[] }) => {
  const COLORS = ['#0C97FA', '#0480D9', '#013677', '#FFBB28', '#FF8042'];

  const modify: PieData[] = [
    { name: 'Basic', value: 0 },
    { name: 'Plus', value: 0 },
    { name: 'Premium', value: 0 },
    { name: 'Pro', value: 0 },
    { name: 'Ultimate', value: 0 },
  ].map((mdata) => {
    data.forEach((packageList) => {
      if (packageList.packageName.toLowerCase() === mdata.name.toLowerCase()) {
        mdata.value = Number(Number(packageList.percentage).toFixed(2));
      }
    });
    return mdata;
  });

  return (
    <div className="h-full w-full rounded-lg bg-bgd2 p-6">
      <h2 className="text-center text-lg font-medium text-gray-700">
        Package Ratio
      </h2>

      <div className="mt-6 flex h-full min-w-64 items-center justify-center">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={modify}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {modify.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserRatioChart;
