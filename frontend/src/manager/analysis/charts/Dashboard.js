import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

// TODO: Reservation. AnalysisAndStatistics 에 대시보드 스타일 적용할 방법 찾기
const Dashboard = () => {
    // 예시 차트 데이터
    const exampleData = {
        labels: ['1월', '2월', '3월', '4월'],
        datasets: [
            {
                label: '예시 데이터',
                data: [10, 20, 30, 40],
                backgroundColor: 'rgba(75,192,192,0.4)',
            },
        ],
    };

    return (
        <div className="dashboard">
            {/* Daily Event */}
            <div className="dashboard-card">
                <h3>Daily Event</h3>
                <p>유효한 이벤트: 0개</p>
                <p>종료된 이벤트: 0개</p>
            </div>

            {/* CPU Top 5 */}
            <div className="dashboard-card">
                <h3>CPU Top 5</h3>
                <p>해당 정보가 없습니다.</p>
            </div>

            {/* Security Monitoring */}
            <div className="dashboard-card">
                <h3>Security Monitoring - IDS</h3>
                <Bar data={exampleData} />
            </div>

            {/* 서비스 이용 내역 */}
            <div className="dashboard-card">
                <h3>서비스 이용 내역</h3>
                <p>서비스 이용 내역이 없습니다.</p>
            </div>

            {/* 네트워크 이용 내역 */}
            <div className="dashboard-card">
                <h3>네트워크 이용 내역</h3>
                <p>해당 정보가 없습니다.</p>
            </div>

            {/* 결제 정보 */}
            <div className="dashboard-card">
                <h3>결제 정보</h3>
                <p>결제 내역이 없습니다.</p>
            </div>
        </div>
    );
};

export default Dashboard;
