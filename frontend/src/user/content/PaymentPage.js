import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'user/content/PaymentPage.css';
import * as PortOne from "@portone/browser-sdk/v2";

const PaymentPage = () => {
  const location = useLocation();
  const reservationInfo = location.state;
  const [userData, setUserData] = useState({});
  const currentDate = new Date();
  const userName = useSelector((state) => state.userState.userName);
  const userLicense = useSelector((state) => state.userState.userLicense);
  const params = {
    userCode: reservationInfo.user_code,
    carCode: reservationInfo.car_code,
    rentalLocation: reservationInfo.branch_name,
    rentalDate: reservationInfo.rental_date,
    rentalTime: '0800',
    returnLocation: reservationInfo.branch_name,
    returnDate: reservationInfo.return_date,
    returnTime: '0900',
    insuranceType: reservationInfo.insurance_type,
    paymentCategory: '1',
    paymentType: '01',
    paymentAmount: reservationInfo.payment_amount,
    reservationDate: currentDate.getFullYear().toString()+(currentDate.getMonth()+1).toString().padStart(2,"0")+currentDate.getDate().toString().padStart(2,"0"),
    paymentDate: currentDate.getFullYear().toString()+(currentDate.getMonth()+1).toString().padStart(2,"0")+currentDate.getDate().toString().padStart(2,"0")
  }

   const  requestPayment = async () => {
    const response = await PortOne.requestPayment(
      {
        storeId: "", // Store ID
        paymentId: `payment-${crypto.randomUUID()}`, // 고유 결제 ID
        orderName: reservationInfo.car_type_name, // 결제 상품명
        totalAmount: 100, // 결제 금액
        currency: "KRW", // 올바른 통화 코드
        channelKey: "", // 채널 키
        payMethod: "CARD", // 결제 방식
      });
      if (response.code !== undefined) {
        return alert(response.message);
      }else{
        console.log("결제 성공 데이터:", response);
          InsertUserReservation();
          alert("결제가 성공적으로 완료되었습니다!");
      }
  };
  

  const InsertUserReservation = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/arentcar/user/cars/reservation`,
        null,
        { params: params }

      );
      if (response.status === 200) {
        alert('예약 성공');
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('There was an error fetching the cars!', error);
      }
    }
  };

  const addCommaToCurrency = (fee) => {
    if (fee.toString().length > 6) {
        return fee.toString().slice(0, -6) + ',' + fee.toString().slice(-6, -3) + ',' + fee.toString().slice(-3);
    } else if (fee.toString().length < 3) {
        return fee.toString();
    }
    return fee.toString().slice(0, -3) + ',' + fee.toString().slice(-3);
}

  useEffect(() => {
    const GetUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/arentcar/user/users/${reservationInfo.user_code}`
        );
        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('There was an error fetching the cars!', error);
        }
      }
    };
    GetUserData();
    console.log(currentDate.getFullYear().toString()+(currentDate.getMonth()+1).toString().padStart(2,"0")+currentDate.getDate().toString().padStart(2,"0"));
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className='payment-page-wrap'>
      <div className='payment-page-title-wrap'>
        <h3>결제</h3>
      </div>
      <div className='payment-page-body-wrap'>
      <div className='payment-page-content-wrap'>
        <div className='payment-page-content-reservation-info'>
          <div className='payment-page-content-reservation-info-header'>
            <span>예약정보</span>
            <span>{reservationInfo.car_type_name}</span>
          </div>
          <div className='payment-page-content-reservation-info-content'>
            <div className='payment-page-content-reservation-info-content-item'>
              <span>예약자</span>
              <span>{`${userData.user_name} / ${userData.user_phone_number}`}</span>
            </div>
            <div className='payment-page-content-reservation-info-content-item'>
              <span>운전면허</span>
              <span>{userData.driver_license_number}</span>
            </div>
            <div className='payment-page-content-reservation-info-content-item'>
              <span>대여기간</span>
              <div className='payment-page-content-reservation-info-content-item-rental-info'>
                <span>{`대여 ${reservationInfo.rental_date.substring(0, 4)}/${reservationInfo.rental_date.substring(4, 6)}/${reservationInfo.rental_date.substring(6)} ${reservationInfo.branch_name}`}</span>
                <span>{`반납 ${reservationInfo.return_date.substring(0, 4)}/${reservationInfo.return_date.substring(4, 6)}/${reservationInfo.return_date.substring(6)} ${reservationInfo.branch_name}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='payment-page-content-discount-info'>
          <div className='payment-page-content-discount-info-header'>
            <span>할인정보</span>
          </div>
          <div className='payment-page-content-discount-info-content'>
            <div className='payment-page-content-discount-info-content-item'>
              <span>회원 할인({reservationInfo.rental_discount_rate}%)</span>
              <span>{addCommaToCurrency(reservationInfo.discount_fee)}원</span>
            </div>
          </div>
        </div>
      </div>
      <div className='payment-page-side-wrap' >
      <div className='payment-page-content-payment-info-content-item'>
              <span>차량 대여 요금</span>
              <span>{addCommaToCurrency(reservationInfo.rental_rate)}원</span>
              <span>{addCommaToCurrency(reservationInfo.payment_amount+reservationInfo.discount_fee)}원</span>
            </div>
            <div className='payment-page-content-payment-info-content-item'>
              <span>차량 보험료</span>
              <span>{addCommaToCurrency(reservationInfo.insurance_type === '01' ?  '15000':'20000')}원</span>
            </div>
            <div className='payment-page-content-payment-info-content-item'>
              <span>할인 금액</span>
              <span>-{addCommaToCurrency(reservationInfo.discount_fee)}원</span>
            </div>
            <div className='payment-page-content-payment-info-total-rate'>
              <span>결제 금액</span>
              <span>{addCommaToCurrency(reservationInfo.payment_amount)}원</span>
            </div>
        <button className='payment-page-side-payment-button' onClick={() => requestPayment()}>결제하기</button>
      </div>
      </div>

      
    </div>
  );
}

export default PaymentPage;