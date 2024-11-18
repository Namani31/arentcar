import React, { useState } from 'react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';


const ReservationStatistics = () => {
    const [filter, setFilter] = useState('daily'); // 선택된 필터 상태

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // 선택된 값을 상태에 반영
    };

    return (
        <div className="reservation-stats">
            <div className="manager-head-column">통계 필터</div>
            <div className="manager-row-column">
                <label className="manager-label">기간 선택:</label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="daily">일별</option>
                    <option value="weekly">주별</option>
                    <option value="monthly">월별</option>
                </select>
            </div>
            <div className="charts">
                {/* 선택된 필터 값을 전달 (daily, weekly, monthly) */}
                <LineChart filter={filter} />
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
};

export default ReservationStatistics;