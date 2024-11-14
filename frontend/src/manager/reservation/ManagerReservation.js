// ManagerReservation.js
import React, { useState } from "react";
import "./ManagerReservation.css";

const ManagerReservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [rentalDate, setRentalDate] = useState("");

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="main-content">
        <header>
          <h2>예약현황</h2>
        </header>
        <div className="filter">
          <span>
            <select name="options">
              <option value="option1">지점명</option>
              <option value="option2">지점 1</option>
              <option value="option3">지점 2</option>
              <option value="option4">지점 3</option>
            </select>
          </span>
          <span>
            <input type="text" placeholder="예약자 성함" name="username" />
            <input
              type="date"
              value={rentalDate}
              onChange={(e) => setRentalDate(e.target.value)}
              placeholder="대여일"
              className="date-picker"
            />
            <button type="submit" className="gray-button">
              조회
            </button>
          </span>
        </div>

        {/* 테이블 대체 div 구조 */}
        <div className="table-container">
          <div className="table-row table-header">
            <div className="table-cell">예약코드</div>
            <div className="table-cell">고객명</div>
            <div className="table-cell">연락처</div>
            <div className="table-cell">지점명</div>
            <div className="table-cell">차량번호</div>
            <div className="table-cell">차량명</div>
            <div className="table-cell">대여일</div>
            <div className="table-cell">반납일</div>
            <div className="table-cell"></div>
          </div>

          <div className="table-row">
            <div className="table-cell">R12345</div>
            <div className="table-cell">김철수</div>
            <div className="table-cell">010-1234-5678</div>
            <div className="table-cell">지점 1</div>
            <div className="table-cell">123가4567</div>
            <div className="table-cell">쏘나타</div>
            <div className="table-cell">2024-11-01</div>
            <div className="table-cell">2024-11-10</div>
            <div className="table-cell">
              <button
                className="gray-button"
                onClick={() =>
                  openModal({
                    code: "R12345",
                    name: "김철수",
                    tel: "010-1234-5678",
                    branch: "지점 1",
                    carNumber: "123가4567",
                    carName: "쏘나타",
                    rentalDate: "2024-11-01",
                    returnDate: "2024-11-10",
                  })
                }
              >
                상세
              </button>
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">R67890</div>
            <div className="table-cell">이영희</div>
            <div className="table-cell">010-1234-5678</div>
            <div className="table-cell">지점 2</div>
            <div className="table-cell">456나7890</div>
            <div className="table-cell">아반떼</div>
            <div className="table-cell">2024-11-05</div>
            <div className="table-cell">2024-11-15</div>
            <div className="table-cell">
              <button
                className="gray-button"
                onClick={() =>
                  openModal({
                    code: "R67890",
                    name: "이영희",
                    tel: "010-1234-5678",
                    branch: "지점 2",
                    carNumber: "456나7890",
                    carName: "아반떼",
                    rentalDate: "2024-11-05",
                    returnDate: "2024-11-15",
                  })
                }
              >
                상세
              </button>
            </div>
          </div>
        </div>
        {/* 테이블 대체 div 구조 끝 */}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h3 className="modal-header">상세 정보</h3>

            {/* 예약코드를 단독으로 표시하는 부분 */}
            <div className="reservation-code">
              <p>
                <strong>예약코드:</strong> <span>{modalData.code}</span>
              </p>
            </div>

            <div className="info-box">
              <h5>고객정보</h5>
              <p>
                <strong>고객명:</strong> <span>{modalData.name}</span>
              </p>
              <p>
                <strong>연락처:</strong> <span>{modalData.tel}</span>
                <strong style={{marginLeft:'15px'}}>생년월일:</strong> <span>0000/00/00</span>
              </p>
            </div>
            <div className="info-box">
              <h5>지점 및 차량정보</h5>
              <p>
                <strong>지점명:</strong> <span>{modalData.branch}</span>
                <strong style={{marginLeft:'15px'}}>지점주소:</strong> <span>0000/00/00</span>
              </p>
              <p>
                <strong>차량명:</strong> <span>{modalData.carName}</span>
                <strong style={{marginLeft:'15px'}}>차량번호:</strong> <span>{modalData.carNumber}</span>
              </p>
              <p>
                <strong>대여일:</strong> <span>{modalData.rentalDate}</span>
                <strong style={{marginLeft:'15px'}}>대여시간:</strong> <span>몇시에</span>
                <strong style={{marginLeft:'15px'}}>대여장소:</strong> <span>어딘가에서</span>
              </p>
              <p>
                <strong>반납일:</strong> <span>{modalData.returnDate}</span>
                <strong style={{marginLeft:'15px'}}>반납시간:</strong> <span>몇시까지</span>
                <strong style={{marginLeft:'15px'}}>반납장소:</strong> <span>어딘가에서</span>
              </p>
            </div>
            <div className="info-box">
              <h5>결제정보</h5>
              <p>
                <strong>결제종류:</strong> <span>카드</span>
                <strong style={{marginLeft:'15px'}}>카드사:</strong> <span>신한</span>
              </p>
              <p>
                <strong>결제금액:</strong> <span>10,000원</span>
              </p>
            </div>
            <div className="btm-btn">
              <button type="button" className="gray-button" id="left-btn">
                예약취소
              </button>
              <button type="button" className="gray-button" id="right-btn">
                반납
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerReservation;
