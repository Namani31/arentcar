// 수익 차트
import React from 'react';
import { Line } from 'react-chartjs-2';

const RevenueChart = () => {
    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월'],
        datasets: [
            {
                label: '수익',
                data: [5000, 7000, 8000, 6000, 7500], // 예시 수익 데이터
                borderColor: 'blue',
                fill: false,
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>수익 차트</h3>
            <Line data={data} />
        </div>
    );
};

export default RevenueChart;
