import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 필요한 요소를 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CarTypeReservationChart = () => {
    const data = {
        labels: ['소형차', '중형차', 'SUV', '트럭'],
        datasets: [
            {
                label: '차량 종류별 예약 건수',
                data: [150, 200, 100, 50],
                backgroundColor: ['red', 'green', 'blue', 'yellow'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>차량 종류별 예약 건수</h3>
            <Bar data={data} />
        </div>
    );
};

export default CarTypeReservationChart;