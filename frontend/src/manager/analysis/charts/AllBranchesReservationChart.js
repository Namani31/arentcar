// 전체 지점 예약 통계
import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker'; // 달력 라이브러리
import { ko } from 'date-fns/locale'; // 달력을 한글로 바꾸기
import 'react-datepicker/dist/react-datepicker.css';
import './AllBranchesReservationChart.css';
import 'index.css';

// 차트 라이브러리의 필요한 요소를 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 일별, 월별의 filter 값을 props로 받음 (daily, monthly)
const AllBranchesReservationChart = () => {

    // 캘린더 시작 날짜와 종료 날짜
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null); 

    // 선택된 필터 상태
    const [filter, setFilter] = useState('daily');

    // 일별, 월별 선택용 핸들러
    const handleFilterChange = (event) => {
        setFilter(event.target.value); // 선택된 값을 상태에 반영
    };

    const data = {
        labels: ['서울', '부산', '대구', '광주', '대전'],
        datasets: [
            {
                label: '예약 건수',
                data: [50, 30, 20, 40, 10],
                backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
            },
        ],
    };

    let filterText;
    if (filter === 'daily') {
        filterText = '일별 전체 지점 예약';
    } else {
        filterText = '월별 전체 지점 예약';
    }

    return (
        <div className="reservation-statistics-list">
            {/* 통계 필터 */}
            <div className="daily-and-monthly-filter-head">
                <div>● 전체 지점 예약 통계 </div>
            </div>

            {/* 일별, 월별 필터 */}
            <div className="daily-and-monthly-filter-row">
                <select className="manager-row-column h6" value={filter} onChange={handleFilterChange}>
                    <option value="daily">일별</option>
                    <option value="monthly">월별</option>
                </select>

                {/* 시작 날짜 */}
                <div className="date-picker-container">
                    <label className="manager-label">시작일: </label>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy년 MM월 dd일"
                        dateFormatCalendar="yyyy년 MM월"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        placeholderText="시작 날짜 선택"
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()} // 시작일, 종료일이 오늘 날짜 이상으로 넘어가지 않음

                    />
                </div>

                {/* 종료 날짜 */}
                <div className="date-picker-container">
                    <label className="manager-label">종료일: </label>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy년 MM월 dd일"
                        dateFormatCalendar="yyyy년 MM월"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText="종료 날짜 선택"
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate} // 최소 기간은 선택한 날짜부터 시작 됨
                        maxDate={new Date()} // 시작일, 종료일이 오늘 날짜 이상으로 넘어가지 않음
                    />
                </div>
            </div>
            
            <div className="chart-container">
                <h3>{filterText}</h3>
                <Bar data={data} />
            </div>
        </div>
    );
};

export default AllBranchesReservationChart;