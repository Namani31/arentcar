// 전체 매출, 각 차량별 매출, 기간별 매출
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

// 필요한 요소를 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = () => {
    const [chartType, setChartType] = useState('total'); // 차트 종류 선택

    const handleChartSwitch = (type) => {
        setChartType(type); // 버튼 클릭 시 차트 변경
    };

    const data =
        chartType === 'total'
            ? {
                  labels: ['2023', '2024'],
                  datasets: [
                      {
                          label: '전체 매출',
                          data: [500000, 700000],
                          backgroundColor: 'lightblue',
                      },
                  ],
              }
            : chartType === 'vehicle'
            ? {
                  labels: ['소형차', '중형차', 'SUV', '트럭'],
                  datasets: [
                      {
                          label: '차량별 매출',
                          data: [100000, 150000, 120000, 50000],
                          backgroundColor: 'green',
                      },
                  ],
              }
            : {
                  labels: ['1월', '2월', '3월', '4월', '5월'],
                  datasets: [
                      {
                          label: '기간별 매출',
                          data: [50000, 40000, 70000, 60000, 80000],
                          backgroundColor: 'purple',
                      },
                  ],
              };

    return (
        <div>
            <div className="chart-buttons">
                <button onClick={() => handleChartSwitch('total')}>전체 매출</button>
                <button onClick={() => handleChartSwitch('vehicle')}>차량별 매출</button>
                <button onClick={() => handleChartSwitch('period')}>기간별 매출</button>
            </div>
            <Bar data={data} />
        </div>
    );
};

export default SalesChart;