import React, { useState, useEffect } from "react";
import axios from "axios";
import "manager/reservation/ManagerReservation.css";
import "index.css";
import { refreshAccessToken, handleLogout } from "common/Common";

const ManagerReservation = () => {
  // 상태 관리
  const [branchNames, setBranchNames] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reserverName, setReserverName] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const pageSize = 10; // 한 페이지에 보여줄 데이터 개수
  const [totalCount, setTotalCount] = useState(0); // 전체 페이지 수
  const [columnDefs] = useState([
    { titlename: "예약 ID", field: "reservation_code", width: 100, align: "center" },
    { titlename: "성함", field: "user_name", width: 100, align: "center" },
    { titlename: "차량번호", field: "car_number", width: 100, align: "center" },
    { titlename: "차량명", field: "car_type_name", width: 200, align: "center" },
    { titlename: "대여지점", field: "rental_location_name", width: 100, align: "center" },
    { titlename: "대여일", field: "rental_date", width: 150, align: "center" },
    { titlename: "반납일", field: "return_date", width: 150, align: "center" },
    { titlename: "", field: "", width: 100, align: "center" }, // 상세버튼 공백 열
  ]);

  const pageingReservations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await getReservations(token);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          const newToken = await refreshAccessToken();
          await getReservations(newToken);
        } catch (error) {
          alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
          handleLogout();
        }
      } else {
        console.error('There was an error fetching the menus pageing!', error);
      }
    }
  };

  const getReservations = async (token) => {
    const params = {
      pageSize,
      pageNumber,
    };

    // 조건이 참일 때만 필드 추가
    if (selectedBranch && selectedBranch.trim() !== '') {
      params.rentalLocationName = selectedBranch;
    }
    if (reservationDate) {
      params.rentalDate = reservationDate;
    }
    if (reserverName && reserverName.trim() !== '') {
      params.userName = reserverName;
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/reservations`, 
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

    if (response.data) {
      setReservations(response.data);
    }
  };

  const getTotalCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await getCount(token);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          const newToken = await refreshAccessToken();
          await getCount(newToken);
        } catch (error) {
          alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
          handleLogout();
        }
      } else {
        console.error('There was an error fetching the Reservations count!', error);
      }
    }
  };

  const getCount = async (token) => {
    const params = {
      ...((selectedBranch && { rentalLocationName: selectedBranch }) || {}),
      ...((reservationDate && { rentalDate: reservationDate }) || {}),
      ...((reserverName && { userName: reserverName }) || {}),
    };

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/reservations/count`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

    if (typeof response.data === 'number') {
      setTotalCount(response.data);
    } else {
      console.error('Unexpected response:', response.data);
    }
  };

  useEffect(() => {
    pageingReservations();
    handleFetchBranchNames();
    getTotalCount();
  }, [pageNumber, pageSize]);



  // 지점명 데이터 가져오기
  const handleFetchBranchNames = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setBranchNames(response.data.map((branch) => branch.branch_name));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          const newToken = await refreshAccessToken();
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs`, {
            headers: { Authorization: `Bearer ${newToken}` },
            withCredentials: true,
          });
          setBranchNames(response.data.map((branch) => branch.branch_name));
        } catch (error) {
          alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
          handleLogout();
        }
      } else {
        console.error("지점명 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    }
  };

  // 팝업 열기 및 닫기
  const handleDetailClick = (reservations) => {
    setIsPopUp(true);
    // setSelectedReservation(reservations); // 선택된 예약 데이터 설정
  };


  const handlePopupClodeClick = () => {
    setIsPopUp(false);
    // setSelectedReservation(null);
  };
  const handleSearchClick = async () => {
    setPageNumber(1); // 검색 조건 변경 시 페이지 번호를 1로 초기화
    await pageingReservations(); // 데이터 다시 로드
    await getTotalCount(); // 총 데이터 개수 다시 로드
  };
  
  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  let totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

  return (
    <div className="manager-reservation-wrap">
      {/* 헤더 */}
      <div className="manager-reservation-header-wrap">
        <div className="manager-reservation-title-wrap">
          <div className="manager-reservation-title manager-title">● 예약현황</div>
        </div>
        <div className="manager-reservation-controls-wrap">
          <input
            type="text"
            placeholder="예약자 성함"
            value={reserverName}
            onChange={(e) => setReserverName(e.target.value)}
            className="manager-reservation-text-input"
          />

          <select
            className="manager-reservation-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">대여지점</option>
            {branchNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            className="manager-reservation-date-input"
          />
          <button
            onClick={handleSearchClick}
            className="manager-reservation-button-search manager-button manager-button-search"
          >
            검색
          </button>
        </div>
      </div>

      {/* 테이블 헤더 */}
      <div className="manager-reservation-content-header-row-wrap">
        {columnDefs.map((title, index) => (
          <div
            key={index}
            className="manager-reservation-content-header-column manager-head-column"
            style={{
              width: `${title.width}px`,
              textAlign: title.align || "center",
            }}
          >
            {title.titlename}
          </div>
        ))}
      </div>

      {/* 테이블 데이터 */}
      <div className="manager-reservation-content-list-wrap">
        {reservations.length > 0 ? (
          reservations.map((reservation, index) => (
            <div key={index} className="manager-reservation-content-item">
              {columnDefs.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="manager-reservation-content-column manager-row-column"
                  style={{
                    ...(column.field === "" ? { display: "flex" } : ""),
                    ...(column.field === "" ? { alignItems: "center" } : ""),
                    ...(column.field === "" ? { justifyContent: "center" } : ""),
                    width: `${column.width}px`,
                    textAlign: column.align || "center",
                  }}
                >
                  {column.field === "" ? (
                    <button
                      className="manager-reservation-content-button-detail manager-button"
                      onClick={() => handleDetailClick(reservations)}
                    >
                      상세
                    </button>
                  ) : (
                    reservation[column.field]
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="manager-reservation-content-no-data">예약 데이터가 없습니다.</div>
        )}
      </div>
      <div className="manager-reservation-pagination-wrap flex-align-center">
        <button
          className="manager-reservation-pagination-button manager-button"
          style={{ color: pageNumber === 1 ? "#aaa" : "rgb(38, 49, 155)" }}
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          이전
        </button>
        <div className="manager-reservation-pagination-info">
          {pageNumber} / {totalPages}
        </div>
        <button
          className="manager-reservation-pagination-button manager-button"
          style={{ color: pageNumber === totalPages ? "#aaa" : "rgb(38, 49, 155)" }}
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          다음
        </button>
      </div>
      {/* 팝업 */}
      {isPopUp &&
        <div className='manager-reservation-popup manager-popup'>
          <div className='manager-reservation-content-popup-wrap'>
            <div className='manager-reservation-content-popup-close'>
              <div className='manager-popup-title'>● 예약상세</div>
              <div className='manager-reservation-content-popup-button'>
                <button className='manager-button manager-button-close' onClick={handlePopupClodeClick}>닫기</button>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ManagerReservation;
