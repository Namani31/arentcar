import React, { useState } from 'react';
import DateReservationChart from './charts/DateReservationChart';
import LocationReservationChart from './charts/LocationReservationChart';

const ReservationStatistics = () => {

    const [filter, setFilter] = useState('daily'); // 선택된 필터 상태
    const [chartType, setChartType] = useState('reservation'); // 선택된 차트 타입 상태

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // 선택된 값을 상태에 반영
    };

    const handleChartSwitch = (type) => {
        setChartType(type); // 버튼 클릭 시 차트 타입 변경
    };

    return (
        <div className="reservation-stats">
            {/* 통계 필터 */}
            <div className="manager-head-column">통계 필터</div>
            <div className="manager-row-column">
                <label className="manager-label">기간 선택:</label>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="daily">일별</option>
                    <option value="weekly">주별</option>
                    <option value="monthly">월별</option>
                </select>
            </div>

            <div className="chart-buttons-container">
                <div className="chart-buttons">
                    <button onClick={() => handleChartSwitch('reservation')}>예약 통계</button>
                    <button onClick={() => handleChartSwitch('location')}>지역별 통계</button>
                    
                    
                </div>
            </div>

            {/* 차트 렌더링 */}
            <div className="charts">
                {/* 필터와 차트 타입에 따라 차트를 렌더링 */}
                {chartType === 'reservation' && <DateReservationChart filter={filter} />}
                {chartType === 'location' && <LocationReservationChart filter={filter} />}
            </div>
        </div>
    );
};

export default ReservationStatistics;