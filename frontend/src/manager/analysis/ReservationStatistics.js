import React, { useState } from 'react';
import AllBranchesReservationChart from './charts/AllBranchesReservationChart';
import LocationReservationChart from './charts/LocationReservationChart';
import './ReservationStatistics.css';
import 'index.css';

const ReservationStatistics = () => {

    const [filter, setFilter] = useState('daily'); // 선택된 필터 상태
    const [chartType, setChartType] = useState('all'); // 처음에 보일 차트 (전체 지점)

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // 선택된 값을 상태에 반영
    };

    const handleChartSwitch = (type) => {
        setChartType(type); // 버튼 클릭 시 차트 타입 변경
    };

    return (
        <div className="reservation-statistics-list">
            {/* 통계 필터 */}
            <div className="daily-and-monthly-filter-head">
                <div>● 전체 지점 예약 통계 </div>
            </div>

            {/* 일별, 월별 필터 */}
            <div className="daily-and-monthly-filter-row">
                <select className="manager-row-column" value={filter} onChange={handleFilterChange}>
                    <option value="daily">일별</option>
                    <option value="monthly">월별</option>
                </select>
                {/* 예약 통계, 지역별 통계 버튼 */}
                <button className='chart-buttons' onClick={() => handleChartSwitch('all')}>전체 지점</button>
                <button className='chart-buttons' onClick={() => handleChartSwitch('location')}>지역별 지점</button>
            </div>

            {/* 차트 렌더링 */}
            <div className="charts">
                {/* 필터와 차트 타입에 따라 차트를 렌더링 */}
                {chartType === 'all' && <AllBranchesReservationChart filter={filter} />}
                {chartType === 'location' && <LocationReservationChart filter={filter} />}
            </div>
        </div>
    );
};

export default ReservationStatistics;