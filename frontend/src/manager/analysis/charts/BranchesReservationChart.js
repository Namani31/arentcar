// 지역별 예약 건수
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './Charts.css';
import 'index.css';
import axios from 'axios';
import { endOfMonth, startOfMonth, subDays, format } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BranchesReservationChart = () => {
    const [startDate, setStartDate] = useState(subDays(new Date(), 7));
    const [endDate, setEndDate] = useState(new Date());
    const [chartData, setChartData] = useState([]); // 차트에 넘겨질 데이터
    const [searchQuery, setSearchQuery] = useState(''); // 검색
    const [suggestions, setSuggestions] = useState([]); // 자동완성 리스트
    const [selectedBranch, setSelectedBranch] = useState(''); // 선택된 지점명
    const [filter, setFilter] = useState('daily'); // 일별, 월별 필터
    const [branchName, setBranchName] = useState(''); // 지점명 검색 상태

    const filterText = filter === 'daily' ? '일별 지점 예약' : '월별 지점 예약';

    // 일별, 월별 클릭 시 호출
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setStartDate(null);
        setEndDate(null);
    };

    // 검색어 변경 시 호출
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() !== '') {
            // API 호출하여 자동완성 리스트 가져오기
            axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs/search`, { params: { query } })
                .then(response => {
                    setSuggestions(response.data); // 응답 데이터 설정
                })
                .catch(error => {
                    console.error("fetching 오류:", error);
                    console.log(error.data);
                });
        } else {
            setSuggestions([]); // 검색어 없으면 초기화
        }
    };

    // 자동완성 항목 클릭 시 호출
    const handleSuggestionClick = (branch) => {
        setSelectedBranch(branch); // 선택된 지점 설정
        setSearchQuery(''); // 검색창 초기화
        setSuggestions([]); // 자동완성 리스트 초기화
    };

    const handleSearch = () => {
        // 검색 버튼 클릭 시 데이터 로드
        fetchChartData();
    };

    const fetchChartData = () => {
        if (startDate && endDate) {
            let formattedStartDate, formattedEndDate;

            if (filter === 'daily') {
                formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
                formattedEndDate = endDate.toISOString().slice(0, 10).replace(/-/g, '');
            } else if (filter === 'monthly') {
                const montlyStart = startOfMonth(startDate);
                const montlyEnd = endOfMonth(endDate);
                formattedStartDate = format(montlyStart, 'yyyyMMdd');
                formattedEndDate = format(montlyEnd, 'yyyyMMdd');
            }

            axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs/reservation`, {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    branchName: branchName.trim(), // API에 지점명 추가
                },
            }).then(response => {
                console.log("API Response Data:", response.data);
                setChartData(response.data);
            }).catch(error => {
                console.error("Error fetching chart data:", error);
            });
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [startDate, endDate, filter]);

    const data = {
        labels: chartData.map(branchsName => branchsName.branch_name),  // 지점 이름
        datasets: [
            {
                label: '예약 건수',
                // reservation_code 가 null, undefined,숫자가 아니면 0
                data: chartData.map(reservations => Number(reservations.reservation_code) || 0),  // 예약 건수
                backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple'],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    },
                },
            },
        },
    };

    return (
        <div className="reservation-statistics-list">
            <div className="daily-and-monthly-filter-head">
                <div>● 지점별 예약 통계 </div>
            </div>

            {/* 일별, 월별 필터 */}
            <div className="daily-and-monthly-filter-row">
                <select className="manager-row-column h6" value={filter} onChange={handleFilterChange}>
                    <option className="option-dropdown" value="daily">일별</option>
                    <option className="option-dropdown" value="monthly">월별</option>
                </select>

                {/* 지점 검색 */}
                <div className="branch-search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="지점명을 입력하세요"
                        className="branch-search-input"
                    />
                    <button onClick={() => alert(`검색: ${selectedBranch}`)}>검색</button>
                    {suggestions.length > 0 && (
                        <ul className="autocomplete-suggestions">
                            {suggestions.map((branch, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(branch)}
                                    className="autocomplete-suggestion-item"
                                >
                                    {branch}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="date-picker-container">
                    <label className="manager-label">시작일: </label>
                    <DatePicker
                        locale={ko}
                        dateFormat={filter === 'daily' ? "yyyy년 MM월 dd일" : "yyyy년 MM월"}
                        dateFormatCalendar={filter === 'daily' ? "yyyy년 MM월" : "yyyy년"}
                        showMonthYearPicker={filter === 'monthly'}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        placeholderText={filter === 'daily' ? "시작 날짜 선택" : "시작 월 선택"}
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()}
                    />
                </div>
                <div className="date-picker-container">
                    <label className="manager-label">종료일: </label>
                    <DatePicker
                        locale={ko}
                        dateFormat={filter === 'daily' ? "yyyy년 MM월 dd일" : "yyyy년 MM월"}
                        dateFormatCalendar={filter === 'daily' ? "yyyy년 MM월" : "yyyy년"}
                        showMonthYearPicker={filter === 'monthly'}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        placeholderText={filter === 'daily' ? "종료 날짜 선택" : "종료 월 선택"}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={new Date()}
                    />
                </div>
            </div>
            <div className="chart-container">
                <h3>{filterText}</h3>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BranchesReservationChart;
