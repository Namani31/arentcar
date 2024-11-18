// 프로모션, 할인 적용 시 예약 건수
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

// 필요한 요소를 등록
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PromotionDiscountChart = () => {
    const dataWithPromotion = {
        labels: ['1월', '2월', '3월', '4월', '5월'],
        datasets: [
            {
                label: '프로모션/할인 적용 시 예약 건수',
                data: [20, 25, 30, 35, 40],
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
            },
        ],
    };

    const dataWithoutPromotion = {
        labels: ['1월', '2월', '3월', '4월', '5월'],
        datasets: [
            {
                label: '프로모션/할인 미적용 시 예약 건수',
                data: [10, 15, 20, 25, 30],
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h3>프로모션/할인 예약 건수 비교</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h4>프로모션/할인 적용</h4>
                    <Line data={dataWithPromotion} />
                </div>
                <div>
                    <h4>프로모션/할인 미적용</h4>
                    <Line data={dataWithoutPromotion} />
                </div>
            </div>
        </div>
    );
};

export default PromotionDiscountChart;
