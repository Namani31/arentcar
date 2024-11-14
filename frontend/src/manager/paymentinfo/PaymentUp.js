// PaymentUp.js
import React, { useState, useEffect } from 'react';
import PaymentDetailModal from './PaymentDetailModal';
import './PaymentUp.css';

const PaymentUp = ({ limit }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const itemsPerPage = limit || 10; // 전체보기일 때 페이지 당 표시할 개수

  useEffect(() => {
    const dummyData = [
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      { id: 1, col1: 'John Doe', col2: 'A1234567', col3: 'New York', col4: 'SUV', col5: 'NY1234', col6: '1 year', col7: '$12000', col8: '$1000', col9: '2024-01-01', col10: '2025-01-01' },
      // 추가 데이터...
    ];
    setData(dummyData);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (row) => {
    setSelectedRow(row);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="payment-up-table-container">
      <table className="payment-up-detail-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>회원명</th>
            <th>면허증</th>
            <th>지역</th>
            <th>차종</th>
            <th>차량번호</th>
            <th>렌트기간</th>
            <th>총 금액</th>
            <th>월 납입금액</th>
            <th>렌트 시작일</th>
            <th>렌트 종료일</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.col1}</td>
              <td>{row.col2}</td>
              <td>{row.col3}</td>
              <td>{row.col4}</td>
              <td>{row.col5}</td>
              <td>{row.col6}</td>
              <td>{row.col7}</td>
              <td>{row.col8}</td>
              <td>{row.col9}</td>
              <td>{row.col10}</td>
              <td>
                <button className="payment-up-detail-button" onClick={() => openModal(row)}>
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 영역 */}
      {!limit && (
        <div className="payment-up-pagination-container">
          <div className="payment-up-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`payment-up-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRow && <PaymentDetailModal row={selectedRow} closeModal={closeModal} />}
    </div>
  );
};

export default PaymentUp;
