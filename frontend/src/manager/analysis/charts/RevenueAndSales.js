// 매출 차트, 수익 차트.js
import React from 'react';
import SalesChart from './SalesChart'; // 매출 차트
import RevenueChart from './RevenueChart'; // 수익 차트

// TODO: <h3> 태그가 왜 적용이 되지 않는지 알아볼 것
const RevenueAndSales = ({ type }) => {
    return (
        <div>
            <div className="chart-container">
                <h3>수익 밎 매출</h3>
                {type === 'total' && <RevenueChart />} {/* 전체 매출 */}
                {type === 'vehicle' && <SalesChart />} {/* 차량별 매출 */}
                {type === 'period' && <SalesChart />} {/* 기간별 매출 */}
            </div>
        </div>
    );
};

export default RevenueAndSales;
