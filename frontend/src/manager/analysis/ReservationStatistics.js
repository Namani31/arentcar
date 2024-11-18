import React, { useState } from 'react';
import DateReservationChart from './charts/DateReservationChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import CarTypeReservationChart from './charts/CarTypeReservationChart'; // 차량 종류별 예약 건수 차트
import PromotionDiscountChart from './charts/PromotionDiscountChart'; // 프로모션/할인 차트
import ReservationCancellationRateChart from './charts/ReservationCancellationRateChart'; // 예약 취소율 차트
import RevenueAndSales from './charts/RevenueAndSales'; // 수익 및 매출 버튼
import SalesChart from './charts/SalesChart'; // 매출 차트


const ReservationStatistics = () => {
    const [filter, setFilter] = useState('daily'); // 기간 필터
    const [selectedChart, setSelectedChart] = useState('total'); // 수익/매출 차트 상태

    const handleFilterChange = (event) => {
        setFilter(event.target.value); // 필터 상태 변경
    };

    const handleChartSwitch = (chartType) => {
        setSelectedChart(chartType); // 수익/매출 차트 상태 변경
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
            
            {/* 차트 필터 및 버튼 */}
            <div className="chart-buttons">
                <button onClick={() => handleChartSwitch('total')}>전체 매출</button>
                <button onClick={() => handleChartSwitch('vehicle')}>차량별 매출</button>
                <button onClick={() => handleChartSwitch('period')}>기간별 매출</button>
            </div>
            
            <div className="charts">
                {/* 필터 값에 따른 DateReservationChart */}
                <DateReservationChart filter={filter} />

                {/* 선택된 수익/매출 차트 */}
                {selectedChart === 'total' && <RevenueAndSales type="total" />}
                {selectedChart === 'vehicle' && <RevenueAndSales type="vehicle" />}
                {selectedChart === 'period' && <RevenueAndSales type="period" />}

                {/* 그 외 차트들 */}
                <CarTypeReservationChart />
                <PromotionDiscountChart />
                <ReservationCancellationRateChart />
                <SalesChart />

                {/* BarChart와 PieChart */}
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
};

export default ReservationStatistics;