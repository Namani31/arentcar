import React from "react";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
};

const CarListsModal = ({ onClose }) => {
  return (
    <div style={modalStyle}>
      <h2>차량 목록</h2>
      <form>
        <input type="text" placeholder="차량 검색" />
        <button>차량검색</button>
      </form>
      <div>차 차 차</div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CarListsModal;
