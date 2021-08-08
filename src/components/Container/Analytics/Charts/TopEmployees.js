import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import '../styles/charts.css'
const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    amt: 2000,
  }
];

export default class TopEmployees extends PureComponent {
    render() {
      return (
        <Card className="badge-style m-3 pb-4 recharts-wrapper"> 
            <Card.Title className="clients-section-header">Top Employees</Card.Title>
            <BarChart
                layout="vertical"
                width={500}
                height={400}
                data={data}
            >
     
            <XAxis type="number" />
            <YAxis  dataKey="name"  type="category" scale="band" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#003f5c"  barSize={35}/>
            </BarChart>
        </Card>
      );
    }
}
  