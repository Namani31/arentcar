import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken, handleLogout } from 'common/Common';
import 'manager/managepayment/ManagePayment.css';
import 'index.css';

const ManagePayment = () => {
  const [branchNames, setBranchNames] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [rentalRates, setRentalRates] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);

  const [columnDefs] = useState([
    { headerName: '예약번호', field: 'reservation_code', width: 100, align: 'center' },
    { headerName: '회원명', field: 'user_name', width: 120, align: 'center' },
    { headerName: '지점', field: 'branch_name', width: 120, align: 'center' },
    { headerName: '차종', field: 'car_type', width: 120, align: 'center' },
    { headerName: '렌트기간', field: 'rental_period', width: 300, align: 'center' },
    { headerName: '결제금액', field: 'payment_amount', width: 120, align: 'center' },
    { headerName: '상세보기', field: '', width: 120, align: 'center' },
  ]);

  const pageingMenus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await getRentalRates(token);
    } catch (error) {
      if (error.response?.status === 403) {
        try {
          const newToken = await refreshAccessToken();
          await getRentalRates(newToken);
        } catch (error) {
          alert('인증이 만료되었습니다. 다시 로그인 해주세요.');
          handleLogout();
        }
      } else {
        console.error('There was an error fetching the menus paging!', error);
      }
    }
  };

  // 결제정보 리스트
  const getRentalRates = async (token) => {
    try {
      const params = { 
        pageSize, 
        pageNumber, 
        };

      // 조건이 참일 때만 필드 추가
    if (selectedBranch && selectedBranch.trim() !== '') {
      params.branchNames = selectedBranch;
    }
    if (reservationDate) {
      params.rentalDate = reservationDate;
    }
    if (searchName && searchName.trim() !== '') {
      params.userName = searchName;
    }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/rentalrates`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setRentalRates(response.data || []);
    } catch (error) {
      console.error('오류 발생 확인 하세요:', error);
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
        console.error('There was an error fetching the RentalRates count!', error);
      }
    }
  };

  const getCount = async (token) => {
    const params = {
      ...((selectedBranch && { branchNames: selectedBranch }) || {}),
      ...((reservationDate && { rentalDate: reservationDate }) || {}),
      ...((searchName && { userName: searchName }) || {}),
    };

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/rentalrates/count`,
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

  // 지점명 가져오기
  const handleFetchBranchNames = async () => {
    try {
      const token = localStorage.getItem('accessToken');
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
          alert('인증이 만료되었습니다. 다시 로그인 해주세요.');
          handleLogout();
        }
      } else {
        console.error('지점명 데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    }
  };

  // 팝업창 열기
  const handleDetailClick = async (reservationCode) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/rentalrates/detail/${reservationCode}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(response.data);
      setDetailData(response.data || {});
      setIsPopUp(true);
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };
  
  // 팝업창닫기
  const handlePopupCloseClick = () => setIsPopUp(false);

  useEffect(() => {
    pageingMenus();
    getTotalCount();
    handleFetchBranchNames();
  }, []);

  // 검색 조건 변경 후 초기화 코드
  const handleSearchClick = async () => {
    setPageNumber(1); // 검색 조건 변경 시 페이지 번호를 1로 초기화
    await pageingMenus(); // 데이터 다시 로드
    await getTotalCount(); // 총 데이터 개수 다시 로드
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageNumber(newPage)};
    }

  let totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

  return (
    <div className="manage-payment-wrap">
      {/* 헤더 */}
      <div className="manage-payment-header-wrap">
        <div className="manage-payment-title-wrap">
          <div className='manage-payment-title manager-title'>
            ● 결제 정보 확인
            </div>
        </div>

        {/* 검색창 */}
        <div className="manage-payment-search-wrap">
          <input 
          type="text" 
          placeholder="회원명" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} />

          <select 
          className="manage-payment-search-select" 
          value={selectedBranch} 
          onChange={(e) => setSelectedBranch(e.target.value)}>

            <option value="">대여지점</option>
            {branchNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="manage-payment-search-reservation-date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
          <button 
          className="manager-button manager-button-search" 
          onClick={handleSearchClick}
          >
            검색
          </button>
        </div>
      </div>

      {/* 테이블 헤더*/}
      <div className="manage-payment-content-header-wrap">
        {columnDefs.map((title, index) => (
          <div key={index} 
          className="manage-payment-content-header-column manager-head-column" 
          style={{ 
            width: `${title.width}px`, 
            textAlign: title.align || "center" 
            }}>
            {title.headerName}
          </div>
        ))}
      </div>
      {/* 테이블데이터 */}
      <div className="manage-payment-content-list-wrap">
        {rentalRates.length > 0 ? (
          rentalRates.map((row, rowIndex) => (
            <div key={rowIndex} 
            className="manage-payment-content-item register-menu-content-row">
              {columnDefs.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="manager-row-column"
                  style={{
                    ...(col.field === "" ? { display: "flex" } : ""),
                    ...(col.field === "" ? { alignItems: "center" } : ""),
                    ...(col.field === "" ? { justifyContent: "center" } : ""),
                    width: `${col.width}px`,
                    textAlign: `${col.align}` || 'center',
                  }}
                >
                  {col.field === '' ? (
                    <button 
                    className="manage-payment-content-button-detail manager-button" 
                    onClick={() => handleDetailClick(row.reservation_code)}
                    >상세
                    </button>
                  ) : (
                    row[col.field]
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="manage-payment-no-data-message">표시할 데이터가 없습니다.</div>
        )}
      </div>

      {/* 팝업 */}
      {isPopUp && (
        <div className="manage-payment-popup-wrap manager-popup">
          <div className='manage-payment-content-popup-wrap'>
            <div className="manage-payment-content-popup-header">
              <div className="manager-popup-title">● 결제상세</div>
              <button
                className="manage-payment-popup-close manager-button"
                onClick={handlePopupCloseClick}
              >
                닫기
              </button>
            </div>
            <div className='manage-payment-content-popup-list'>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>예약번호</div>
                <div className='manage-payment-detail-row-value'>{detailData.reservation_code}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>회원명</div>
                <div className='manage-payment-detail-row-value'>{detailData.user_name}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>연락처</div>
                <div className='manage-payment-detail-row-value'>{detailData.phone_number}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>면허증</div>
                <div className='manage-payment-detail-row-value'>{detailData.driver_license}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>면허증 만료일</div>
                <div className='manage-payment-detail-row-value'>{detailData.driver_expiry}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>지점명</div>
                <div className='manage-payment-detail-row-value'>{detailData.branch_name}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>차량종류</div>
                <div className='manage-payment-detail-row-value'>{detailData.car_type}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>차량번호</div>
                <div className='manage-payment-detail-row-value'>{detailData.car_number}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>렌트시작일</div>
                <div className='manage-payment-detail-row-value'>{detailData.rental_date}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>렌트반납일</div>
                <div className='manage-payment-detail-row-value'>{detailData.return_date}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>렌트이용기간</div>
                <div className='manage-payment-detail-row-value'>{detailData.rental_period}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>결제구분</div>
                <div className='manage-payment-detail-row-value'>{detailData.payment_category}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>결제종류</div>
                <div className='manage-payment-detail-row-value'>{detailData.payment_type}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>결제금액</div>
                <div className='manage-payment-detail-row-value'>{detailData.payment_amount}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>예약일</div>
                <div className='manage-payment-detail-row-value'>{detailData.created_at}</div>
              </div>
              <div className='manage-payment-detail-column'>
                <div className='manage-payment-detail-row-title'>업데이트</div>
                <div className='manage-payment-detail-row-value'>{detailData.updated_at}</div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="manage-payment-pagination-wrap flex-align-center">
        <button 
        className="manager-button" 
        style={{color: pageNumber === 1 ?  '#aaa' : 'rgb(38, 49, 155)'}}
        onClick={() => handlePageChange(pageNumber - 1)} 
        disabled={pageNumber === 1}
        >이전
        </button>
        <div className='manage-payment-pagination-display'>
          {pageNumber} / {totalPages}
          </div>
        <button 
        className="manager-button" 
        style={{color: pageNumber === totalPages ?  '#aaa' : 'rgb(38, 49, 155)'}} 
        onClick={() => handlePageChange(pageNumber + 1)} 
        disabled={pageNumber === totalPages}
        >다음</button>
      </div>
    </div>
  );
};

export default ManagePayment;
