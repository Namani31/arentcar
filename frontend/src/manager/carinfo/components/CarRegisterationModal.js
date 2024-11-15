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

const CarRegisterationModal = ({ onClose }) => {
  return (
    <div style={modalStyle}>
      <h2>차량 등록</h2>
      <form>
        <label for="car-type-cartegory">차종구분</label>
        <select id="car-type-cartegory">
          <option value="01">전기차</option>
          <option value="02">소형/경차</option>
          <option value="03">중형</option>
          <option value="04">준대형</option>
          <option value="05">대형</option>
        </select>

        <input type="text" placeholder="차종명" />
        <button type="submit">등록</button>

        <label for="seating-capacity">인승구분</label>
        <select id="seating-capacity">
          <option value="01">5인승</option>
          <option value="04">6인승</option>
          <option value="02">7인승</option>
          <option value="03">9인승</option>
        </select>
      </form>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CarRegisterationModal;
