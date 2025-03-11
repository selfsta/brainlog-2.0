import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{date: 'Page A', wl: 80}, {date: 'Page B', wl: 50}];

const formatData = (entries) => {
    return entries
      .map(entry => ({
        date: new Date(entry.createdAt).toLocaleDateString("en-US"),
        wl: entry.wellbeing
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

const Chart = ({entries}) => {
    const chartData = formatData(entries)
  return (
    <div className="chart-container">
    <LineChart 
        className='line-chart'
        width={1000} 
        height={300} 
        data={chartData} 
        margin={{ top: 20, right: 30, bottom: 50, left: 50 }} // More space for labels
    >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis 
            dataKey="date" 
            angle={-35} // Rotates labels for better readability
            margin={{ top: 40}}
            textAnchor="end"
        />
         <YAxis 
            label={{ 
                value: "Wellness %", 
                angle: -90, 
                position: "insideLeft", 
                offset: -5, 
                dy: 20
            }}  
            domain={[0, 100]}
        />
        <Tooltip 
            formatter={(value) => [`${value}% Wellness`]} 
        />
        
        <Line type="linear" dataKey="wl" strokeWidth={3} stroke="#345e22" />
    </LineChart>
</div>

  )
}

export default Chart
