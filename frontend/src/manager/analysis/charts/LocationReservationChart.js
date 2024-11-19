// 지역별 예약 건수
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
import './Charts.css';

// 필요한 요소를 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LocationReservationChart = () => {
    const data = {
        labels: ['서울', '부산', '대구', '광주', '대전'],
        datasets: [
            {
                label: '지역별 예약 건수',
                data: [50, 30, 20, 40, 10],
                backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>지역별 예약 통계</h3>
            <Bar data={data} />
        </div>
    );
};

export default LocationReservationChart;
