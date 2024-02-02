import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const CityEventsChart = ({ events, allLocations }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split((/, | - /))[0]
      return { city, count };
    })
    return data;
  }

  return (
    <div>
      <h3>Number of Events by City</h3>
      <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid stroke="#fff" />
        <XAxis 
          type="category" dataKey="city" name="City" stroke="#fff"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis 
          type="number" dataKey="count" stroke="#fff"
          name="Number of Events" allowDecimals={false} 
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events per city" data={data} fill="#8359ee" />
      </ScatterChart>
    </ResponsiveContainer>
    </div>
    
  );
};

export default CityEventsChart;