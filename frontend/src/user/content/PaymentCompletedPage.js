import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import 'user/content/PaymentCompletedPage.css'

const PaymentCompletedPage = () => {
    const location = useLocation();
    const reservationInfo = location.state;
    const [reservationNumber,setReservationNumber] =useState(0);
    const userName = useSelector((state) => state.userState.userName);
    const userLicense = useSelector((state) => state.userState.userLicense);

    useEffect(() => {
        console.log(reservationInfo);
    }, [reservationInfo])

    useEffect(() => {
        console.log(reservationNumber);
    }, [reservationNumber])
    useEffect(() => {
        const getReservationNumber = async () => {
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/arentcar/user/cars/reservation/number`,
              );
              if (response.date) {
                setReservationNumber(response.date);
                console.log(response.date);
              }
            } catch (error) {
              if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
              } else {
                console.error('There was an error fetching the cars!', error);
              }
            }
          };
          getReservationNumber();
    }, [])

    return (
        <div className='payment-completed-page-wrap'>
            <div className='payment-completed-page-header'>
                <h2 className='payment-completed-page-title'>예약 완료</h2>
            </div>
            <div className='payment-completed-page-body'>
                <div className='payment-completed-page-item'><span>예약번호</span><span>{reservationNumber}</span></div>
                <div className='payment-completed-page-item'><span>예약자명</span><span>{userName}</span></div>
                <div className='payment-completed-page-item'><span>차량명</span><span>{reservationInfo.car_type_name}</span></div>
                <div className='payment-completed-page-item'><span>예약기간</span><span>{reservationInfo.rental_date.substring(0, 4) + '.' + reservationInfo.rental_date.substring(4, 6) + '.' + reservationInfo.rental_date.substring(6)} ~ {reservationInfo.return_date.substring(0, 4) + '.' + reservationInfo.return_date.substring(4, 6) + '.' + reservationInfo.return_date.substring(6)}</span></div>
                <div className='payment-completed-page-item'><span>요금</span><span>{reservationInfo.payment_amount}원</span></div>
            </div>
        </div>
    );
}

export default PaymentCompletedPage;