import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 필요한 요소를 등록
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월'],
        datasets: [
            {
                label: '예약 건수',
                data: [10, 20, 30, 25, 35],
                borderColor: 'blue',
                backgroundColor: 'rgba(173, 216, 230, 0.5)',
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>월별 예약 통계</h3>
            <Line data={data} />
        </div>
    );
};

export default LineChart;