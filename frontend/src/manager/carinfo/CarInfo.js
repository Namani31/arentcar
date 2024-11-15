import { useState } from "react";
import "manager/carinfo/CarInfo.css";

const CarInfo = ({ onClick }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [workMode, setWorkMode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [totalMenus, setTotalMenus] = useState(0);

  const [isCarRegisterationModalOpen, setIsCarRegisterationModalOpen] = useState(false);
  const [isCarListsModalOpen, setIsCarListsModalOpen] = useState(false);

  const [columnDefs] = useState([
    { headerName: '코드', field: 'menu_code', width: 80, align: 'center' },
    { headerName: '차량번호', field: 'car_number', width: 80, align: 'center' },
    { headerName: '차종구분', field: 'car_type_category', width: 80, align: 'center' },
    { headerName: '차종명', field: 'car_type_name', width: 80, align: 'center' },
    { headerName: '지점', field: 'branch_name', width: 80, align: 'center' },
    { headerName: '연료', field: 'fuel_type', width: 80, align: 'center' },
    { headerName: '인승', field: 'seating_capacity', width: 80, align: 'left' },
    { headerName: '속도제한', field: 'speed_limit', width: 80, align: 'left' },
    { headerName: '면허제한', field: 'license_restriction', width: 80, align: 'center' },
    { headerName: '제조사', field: 'car_manufacturer', width: 80, align: 'center' },
    { headerName: '년식', field: 'model_year', width: 80, align: 'center' },
    { headerName: '작업', field: '', width: 200, align: 'center' },
  ]);

  const [menuCode, setMenuCode] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carTypeCategory, setCarTypeCategory] = useState("");
  const [carTypeName, setCarTypeName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [speedLimit, setSpeedLimit] = useState("");
  const [licenseRestriction, setLicenseRestriction] = useState("");
  const [carManufacturer, setCarManufacturer] = useState("");
  const [modelYear, setMmodelYear] = useState("");

  const optionsMenuKind = [
    { value: '1', label: '사용자메뉴' },
    { value: '2', label: '관리자메뉴' },
  ];

  const optionsMenuType = [
    { value: '1', label: '대분류메뉴' },
    { value: '2', label: '중분류메뉴' },
    { value: '3', label: '소분류메뉴' },
  ];

  const viewDataInit = () => {
    setMenuCode("")
    setCarNumber("")
    setCarTypeCategory("")
    setCarTypeName("")
    setBranchName("")
    setFuelType("")
    setSeatingCapacity("")
    setSpeedLimit("")
    setLicenseRestriction("")
    setCarManufacturer("")
    setMmodelYear("")
  };

  const handleSearchClick = async () => {
   // pageingMenus();
   // getTotalMenusCount();
  };

  const handleDetailSearchClick = async () => {
    // pageingMenus();
    // getTotalMenusCount();
   };

  const handleInsertClick = (workMode) => {
    setIsPopUp(true);
    setWorkMode(workMode);
    viewDataInit();
  };

  const handleCloseClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const totalWidth = columnDefs.reduce((sum, columnDef) => {
    return sum + (columnDef.width ? columnDef.width : 150);
  }, 0);

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
    <div className="car-info-wrap">
      <div className="car-info-header-wrap">
        <div className="car-info-title-wrap">
          <div className="manager-title">● 차량관리</div>
        </div>
        <div
          className='car-info-button-wrap'
          style={{ width: `${totalWidth}px` }}
        >
          <div className='flex-align-center'>
            <label className='manager-label' htmlFor="">차량검색</label>
            <input className='width200' type="text" value={searchName} onChange={(e) => (setSearchName(e.target.value))}/>
            <button className='manager-button manager-button-search' onClick={() => handleSearchClick()}>검색</button>
            <button className='manager-button manager-button-search' onClick={() => handleDetailSearchClick()}>상세검색</button>
            <span>[검색건수 : {totalMenus}건]</span>
          </div>
          <div>
            <button className='manager-button manager-button-insert' onClick={() => handleInsertClick("등록")}>추가</button>
            <button className='manager-button manager-button-close' onClick={() => handleCloseClick()}>닫기</button>
          </div>
        </div>
      </div>

      <div className="car-info-content-wrap">
        <div className="car-info-content-header"></div>
        <div className="car-info-content-low-wrap"></div>
        {isPopUp &&
          <div className='manager-popup'>
            <div className='car-info-content-popup-wrap'>
              <div className='car-info-content-popup-close'>
                <div className='manager-popup-title'>● 차량{workMode}</div>
                <div className='car-info-content-popup-button'>
                  <button className='manager-button manager-button-save' onClick>저장</button>
                  <button className='manager-button manager-button-close' onClick>닫기</button>
                </div>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">메뉴코드</label>
                <input className='width50  word-center' type="text" value={menuCode} disabled />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차종구분</label>
                <select className='width100' id="comboBox" value={carTypeCategory} onChange={(e) => (setCarTypeCategory(e.target.value))}>
                  {optionsMenuKind.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차종명</label>
                <input className='width30 word-center' value={carTypeName} type="text" maxLength={2} onChange={(e) => setCarTypeName(e.target.value)} />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">수용인원</label>
                <select className='width100' id="comboBox" value={seatingCapacity} onChange={(e) => (setSeatingCapacity(e.target.value))}>
                  {optionsMenuType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차량번호</label>
                <input className='width50  word-center' type="text" value={carNumber} />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default CarInfo;
