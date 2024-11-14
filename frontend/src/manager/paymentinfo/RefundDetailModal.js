// RefundDetailModal.js
import React from 'react';
import './RefundDetailModal.css';

const RefundDetailModal = ({ row, closeModal }) => {
  if (!row) return null;

  return (
    <div className="refund-modal-overlay">
      <div className="refund-modal-content">
        <button onClick={closeModal} className="refund-close-button">×</button>
        <h2>환불 상세 정보</h2>
        <table className="refund-detail-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{row.id}</td>
            </tr>
            <tr>
              <th>회원명</th>
              <td>{row.col1}</td>
            </tr>
            <tr>
              <th>면허증</th>
              <td>{row.col2}</td>
            </tr>
            <tr>
              <th>지역</th>
              <td>{row.col3}</td>
            </tr>
            <tr>
              <th>차종</th>
              <td>{row.col4}</td>
            </tr>
            <tr>
              <th>차량번호</th>
              <td>{row.col5}</td>
            </tr>
            <tr>
              <th>렌트 시작일</th>
              <td>{row.col6}</td>
            </tr>
            <tr>
              <th>렌트 종료일</th>
              <td>{row.col7}</td>
            </tr>
            <tr>
              <th>남은 기간</th>
              <td>{row.col8}</td>
            </tr>
            <tr>
              <th>총 금액</th>
              <td>{row.col9}</td>
            </tr>
            <tr>
              <th>월 납입금액</th>
              <td>{row.col10}</td>
            </tr>
            <tr>
              <th>환불 금액</th>
              <td>{row.col12}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundDetailModal;
