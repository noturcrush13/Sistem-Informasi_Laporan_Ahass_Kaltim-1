import React from "react";
import moment from 'moment';
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineRechartPendapatan = ({ data }) => {
    const Max = Math.max(...data.map(item => item.ue));
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                    dataKey="tanggal" 
                    // tickFormatter={(tick) => moment(tick).format('DD')} 
                />
                <YAxis domain={[0, Max]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_pendapatan" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineRechartPendapatan;
