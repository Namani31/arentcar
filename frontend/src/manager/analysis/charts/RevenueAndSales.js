// RevenueAndSales.js
import React from 'react';
import SalesChart from './SalesChart'; // 매출 차트
import RevenueChart from './RevenueChart'; // 수익 차트

const RevenueAndSales = ({ type }) => {
    return (
        <div>
            {type === 'total' && <RevenueChart />} {/* 전체 매출 */}
            {type === 'vehicle' && <SalesChart />} {/* 차량별 매출 */}
            {type === 'period' && <SalesChart />} {/* 기간별 매출 */}
        </div>
    );
};

export default RevenueAndSales;
