import React from "react";
import { useState } from "react";
import CarRegisterationModal from "./components/CarRegisterationModal";
import CarListsModal from "./components/CarListsModal";

const CarInfo = () => {
  const [isCarRegisterationModalOpen, setIsCarRegisterationModalOpen] = useState(false);
  const [isCarListsModalOpen, setIsCarListsModalOpen] = useState(false);

  const handleOpenCarRegisterationModal = () => {
    setIsCarRegisterationModalOpen(true);
  };

  const handleCloseCarRegisterationModal = () => {
    setIsCarRegisterationModalOpen(false);
  };

  const handleOpenCarListsModal = () => {
    setIsCarListsModalOpen(true);
  };

  const handleCloseCarListsModal = () => {
    setIsCarListsModalOpen(false);
  };

  return (
    <div>
      <h1>차량 관리 페이지</h1>
      <button onClick={handleOpenCarRegisterationModal}>차량등록</button>
      <button onClick={handleOpenCarListsModal}>전체차량</button>
      <div>
        {isCarRegisterationModalOpen && <CarRegisterationModal onClose={handleCloseCarRegisterationModal} />}
        {isCarListsModalOpen && <CarListsModal onClose={handleCloseCarListsModal} />}
      </div>
    </div>
  );
};

export default CarInfo;
