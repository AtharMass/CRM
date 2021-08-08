import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card'
import '../styles/charts.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

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
  },
  {
    name: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    pv: 4300,
    amt: 2100,
  },
];

export default class Sales extends PureComponent {
    render() {
        return (
            <Card className="badge-style m-3 pb-4 center-carde"> 
                <Card.Title className="clients-section-header">
                    Sales By 
                    <select className="sales-select-style"  name="sales" >
                        <option as="button"  >Country</option>
                    </select>
                </Card.Title>
                <BarChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 15,
                            right: 0,
                            left: 15,
                            bottom: 0,
                        }}
                >
        
                <XAxis  dataKey="name"  type="category" scale="band" />
                <YAxis type="number"  />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="pv" fill="#955196"  barSize={35}/>
                </BarChart>
            </Card>
        );
  }
}
