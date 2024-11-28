import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker'; // 달력 라이브러리
import { ko } from 'date-fns/locale'; // 달력을 한글로 바꾸기
import 'react-datepicker/dist/react-datepicker.css';
import './AllBranchesReservationChart.css';
import 'index.css';
import axios from 'axios';
import { endOfMonth, startOfMonth } from 'date-fns';
import { subDays } from 'date-fns';
import { format } from 'date-fns';
import CommonChart from './CommonChart';


const AllCarTypeReservationChart = () => {
    return (
        <div className="reservation-statistics-list">
            <div className="daily-and-monthly-filter-head">
                <div>● 차종별 예약 통계 </div>
                <CommonChart />
            </div>
        </div>

    );
};
export default AllCarTypeReservationChart