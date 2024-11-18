// 예약 건수
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

// filter 값을 props로 받음 (daily, weekly, monthly)
const LineChart = ({ filter }) => { 
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

    // 필터에 따라 h3 텍스트 동적으로 변경
    const filterText = filter === 'daily' ? '일별 예약 통계' :
                      filter === 'weekly' ? '주별 예약 통계' :
                      '월별 예약 통계';

    return (
        <div className="chart-container">
            <h3>{filterText}</h3> {/* 필터에 따라 텍스트 변경 */}
            <Line data={data} />
        </div>
    );
};

export default LineChart;