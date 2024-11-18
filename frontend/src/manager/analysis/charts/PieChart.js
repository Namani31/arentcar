// 렌트 기간 별 통계
import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Charts.css';

// 필요한 요소를 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['1일', '2-3일', '4-7일', '8일 이상'],
        datasets: [
            {
                label: '렌트 기간별',
                data: [25, 35, 20, 20],
                backgroundColor: ['orange', 'pink', 'cyan', 'lightgreen'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>렌트 기간별 통계</h3>
            <div className="pie-chart-wrapper">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default PieChart;
