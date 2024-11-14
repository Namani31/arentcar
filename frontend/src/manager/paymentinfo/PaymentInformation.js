// PaymentInformation.js
import React, { useState } from 'react';
import PaymentUp from './PaymentUp';
import RefundPayment from './RefundPayment';
import './PaymentInformation.css';

const PaymentInformation = () => {
  const [activeComponent, setActiveComponent] = useState('information');

  const navigateToPayment = () => {
    setActiveComponent('payment');
  };

  const navigateToRefund = () => {
    setActiveComponent('refund');
  };

  const navigateBackToInformation = () => {
    setActiveComponent('information');
  };

  return (
    <div className="payment-information-container"> {/* 컴포넌트 이름을 포함한 고유 클래스명 */}
      {activeComponent === 'information' && (
        <>
          <h5 className="payment-information-title">결제 및 환불 정보</h5> {/* 고유 클래스명 */}
          <br></br>
          <div className="payment-information-section">
            <h6 className="payment-information-subtitle">결제 정보</h6>
            <PaymentUp limit={6} />
            <button className="payment-information-button" onClick={navigateToPayment}> {/* 고유 클래스명 */}
              결제 정보 전체 보기
            </button>
          </div>
          <div className="payment-information-section">
            <h6 className="payment-information-subtitle">환불 정보</h6>
            <RefundPayment limit={6} />
            <button className="payment-information-button" onClick={navigateToRefund}> {/* 고유 클래스명 */}
              환불 정보 전체 보기
            </button>
          </div>
        </>
      )}

      {activeComponent === 'payment' && (
        <>
          <button className="payment-information-back-button" onClick={navigateBackToInformation}> {/* 고유 클래스명 */}
            뒤로 가기
          </button>
          <PaymentUp />
        </>
      )}

      {activeComponent === 'refund' && (
        <>
          <button className="payment-information-back-button" onClick={navigateBackToInformation}> {/* 고유 클래스명 */}
            뒤로 가기
          </button>
          <RefundPayment />
        </>
      )}
    </div>
  );
};

export default PaymentInformation;
