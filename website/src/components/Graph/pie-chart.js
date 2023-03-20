import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class PieRechartComponent extends React.Component {

    COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
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
