import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  useEffect(() => {
    setData(getData());
  }, [events]);

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      }
    })
    return data;
  };
  
  const colors = ['#DD0000', '#00DD00', '#6fa8dc', '#DDDD00', '#DD00DD'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, innerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div>
      <h3>Events by Topic</h3>
      <ResponsiveContainer width="99%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}           
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
            }
          </Pie>
          <Legend verticalAlign='bottom' height={40} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default EventGenresChart;