import React, { useState } from 'react';
import DateReservationChart from './charts/DateReservationChart';
import LocationReservationChart from './charts/LocationReservationChart';
import RentDateReservationChart from './charts/RentDateReservationChart';
import CarTypeReservationChart from './charts/CarTypeReservationChart';
import PromotionDiscountChart from './charts/PromotionDiscountChart';
import ReservationCancellationRateChart from './charts/ReservationCancellationRateChart';
import RevenueAndSales from './charts/RevenueAndSales';
import SalesChart from './charts/SalesChart';

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
                <button onClick={() => handleChartSwitch('reservation')}>예약 통계 </button>
                    <button onClick={() => handleChartSwitch('sales')}>수익 및 매출</button>
                    <button onClick={() => handleChartSwitch('customer')}>고객 분석</button>
                    <button onClick={() => handleChartSwitch('vehicle')}>차량 운용</button>
                    <button onClick={() => handleChartSwitch('report')}>리포트 출력 및 공유</button>
                </div>
            </div>

            {/* 차트 렌더링 */}
            <div className="charts">
                {/* 필터와 차트 타입에 따라 차트를 렌더링 */}
                {chartType === 'reservation' && <DateReservationChart filter={filter} />}
                {chartType === 'sales' && <SalesChart filter={filter} />}
                {chartType === 'customer' && <RevenueAndSales filter={filter} />}
                {chartType === 'vehicle' && <CarTypeReservationChart filter={filter} />}
            </div>
        </div>
    );
};

export default ReservationStatistics;