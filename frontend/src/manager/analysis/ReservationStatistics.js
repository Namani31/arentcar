import React from 'react';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';


const ReservationStatistics = () => {
    return (
        <div className="reservation-stats">
            <div className="manager-head-column">통계 필터</div>
            <div className="manager-row-column">
                <label className="manager-label">기간 선택:</label>
                <select>
                    <option value="daily">일별</option>
                    <option value="weekly">주별</option>
                    <option value="monthly">월별</option>
                </select>
            </div>
            <div className="charts">
                <LineChart />
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
};

export default ReservationStatistics;