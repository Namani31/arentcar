// 지역별 예약 건수
import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 필요한 요소를 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// filter 값을 props로 받음 (daily, monthly)
const AllBranchesReservationChart = ({ filter }) => {
    const data = {
        labels: ['서울', '부산', '대구', '광주', '대전'],
        datasets: [
            {
                label: '예약 건수',
                data: [50, 30, 20, 40, 10],
                backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
            },
        ],
    };

    let filterText;

    if (filter === 'daily') {
        filterText = '일별 전체 지점 예약 통계';
    } else {
        filterText = '월별 전체 지점 예약 통계';
    }

    return (
        <div className="chart-container">
            <h3>{filterText}</h3>
            <Bar data={data} />
        </div>
    );
};

export default AllBranchesReservationChart;
