import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class PieRechartComponent extends React.Component {

    COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#AF19FF',
        '#FF00FF',
        '#00FFFF',
        '#FF0000',
        '#000033',
        '#0000FF',
        '#FFFF00',
        '#FFA500',
        '#800080',
        '#008080',
        '#800000',
        '#008000',
        '#000080'
    ];
      

    CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          const data = payload[0];
          const percent = ((data.value / payload.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(2);
          return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
              <p>{`${data.name}`}</p>
              <p>{`Value: ${data.value}`}</p>
            </div>
          );
        }
      
        return null;
    };

    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                    <Pie 
                    data={data} 
                    color="#000000" 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={150} 
                    label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
                    fill="#8884d8"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip content={<this.CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        )
    };
}

export default PieRechartComponent;
