// 예약 취소율
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

const ReservationCancellationRateChart = () => {
    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월'],
        datasets: [
            {
                label: '예약 취소율',
                data: [5, 7, 8, 6, 4],
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 165, 0, 0.5)',
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>예약 취소율</h3>
            <Line data={data} />
        </div>
    );
};

export default ReservationCancellationRateChart;
