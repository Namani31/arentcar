import { useState } from "react";
import axios from "axios";
import { refreshAccessToken, handleLogout } from 'common/Common';
import "manager/carinfo/CarInfo.css";

const CarInfo = ({ onClick }) => {
  const [menus, setMenus] = useState([])
  const [isPopUp, setIsPopUp] = useState(false);
  const [workMode, setWorkMode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);

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
    { headerName: '차량이미지명', field: 'car_image_name', width: 80, align: 'center' },
    { headerName: '년식', field: 'model_year', width: 80, align: 'center' },
    { headerName: '작업', field: '', width: 200, align: 'center' },
  ]);

  const [menuCode, setMenuCode] = useState("");
  const [carTypeCategory, setCarTypeCategory] = useState("");
  const [carTypeName, setCarTypeName] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [speedLimit, setSpeedLimit] = useState("");
  const [licenseRestriction, setLicenseRestriction] = useState("");
  const [carManufacturer, setCarManufacturer] = useState("");
  const [carImageName, setCarImageName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [branchName, setBranchName] = useState("");

  const optionsMenuCarTypeCategory = [
    { value: '01', label: '전기차' },
    { value: '02', label: '소형/경차' },
    { value: '03', label: '중형' },
    { value: '04', label: '준대형' },
    { value: '05', label: '대형' },
  ];

  const optionsMenuSeatingCapacity = [
    { value: '01', label: '5인승' },
    { value: '02', label: '6인승' },
    { value: '03', label: '7인승' },
    { value: '04', label: '9인승' },
  ];

  const optionsMenuFuelType = [
    { value: '01', label: '휘발유' },
    { value: '02', label: '경유' },
    { value: '03', label: 'LPG' },
    { value: '04', label: '전기' },
    { value: '05', label: '휘발유+전기' },
  ];

  const optionsMenuSpeedLimit = [
    { value: '01', label: '110km' },
    { value: '02', label: '180km' },
  ];

  const optionsMenuLicenseRestriction = [
    { value: '01', label: '2종보통' },
    { value: '02', label: '1종보통' },
  ];

  const optionsMenuCarManufacturer = [
    { value: '01', label: '기아' },
    { value: '02', label: '현대' },
    { value: '03', label: '제네시스' },
    { value: '04', label: '르노' },
    { value: '05', label: 'KG모빌리티' },
    { value: '06', label: '쉐보레' },
    { value: '07', label: '테슬라' },
    { value: '08', label: '벤츠' },
  ];

  const optionsMenuBranchName = [
    { value: '01', label: '수원 본점' },
    { value: '02', label: '용인점' },
    { value: '03', label: '오산점' },
    { value: '04', label: '화성점' },
    { value: '05', label: '평택점' },
    { value: '06', label: '광명점' },
    { value: '07', label: '제주점' },
    { value: '08', label: '대구 본점' },
    { value: '09', label: '부산점' },
    { value: '10', label: '대전점' },
    { value: '11', label: '전주점' },
    { value: '12', label: '순창점' },
    { value: '13', label: '춘천점' },
  ];

  const handleUpdateClick = (updateData, workMode) => {
    setIsPopUp(true);
    setWorkMode(workMode);
    setMenuCode(updateData.menu_code);
    setCarTypeCategory(updateData.car_type_category);
    setCarTypeName(updateData.car_type_name);
    setSeatingCapacity(updateData.seating_capacity);
    setFuelType(updateData.fuel_type);
    setSpeedLimit(updateData.speed_limit);
    setLicenseRestriction(updateData.license_restriction);
    setCarManufacturer(updateData.car_manufacturer)
    setCarImageName(updateData.car_image_name)
    setCarNumber(updateData.car_number);
    setModelYear(updateData.model_year)
    setBranchName(updateData.branch_name);
  };

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
    setModelYear("")
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
    // viewDataInit();
  };

  const handleDeleteClick = async (menuCode) => {
    if (window.confirm('자료를 정말로 삭제하시겠습니까?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await deleteMenu(token, menuCode);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          try {
            const newToken = await refreshAccessToken();
            await deleteMenu(newToken, menuCode);
          } catch (error) {
            alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
            handleLogout();
          }
        } else {
          alert("삭제 중 오류가 발생했습니다." + error);
        }
      }
    }
  };

  const deleteMenu = async (token, menuCode) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/arentcar/manager/menus/${menuCode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    });
    setMenus((prevMenus) => prevMenus.filter(menu => menu.menu_code !== menuCode));
    alert("자료가 삭제되었습니다.");
  };

  const handleDataSaveClick = async () => {
    if (!validateCheck()) {
      return; 
    }

    const newMenu = {
      menu_code: menuCode,
      car_number: carNumber,
      car_type_category: carTypeCategory,
      car_type_name: carTypeName,
      branch_name: branchName,
      fuel_type: fuelType,
      seating_capacity: seatingCapacity,
      speed_limit: speedLimit,
      license_restriction: licenseRestriction,
      car_manufacturer: carManufacturer,
      car_image_name: carImageName,
      model_year: modelYear,
    };

    if (workMode === "수정") {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        await updateMenu(token, newMenu);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          try {
            const newToken = await refreshAccessToken();
            await updateMenu(newToken, newMenu);
          } catch (error) {
            alert("인증이 만료되었습니다. 다시 로그인 해주세요." + error);
            handleLogout();
          }
        } else {
          alert("수정 중 오류가 발생했습니다." + error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        await createMenu(token, newMenu);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          try {
            const newToken = await refreshAccessToken();
            await createMenu(newToken, newMenu);
          } catch (error) {
            alert("인증이 만료되었습니다. 다시 로그인 해주세요." + error);
            handleLogout();
          }
        } else {
          alert("등록 중 오류가 발생했습니다." + error);
        }
      } finally {
        setLoading(false);
      }
    }

    setIsPopUp(false);
  };

  // const updateMenu = async (token, newMenu) => {
  //   await axios.put(
  //     `${process.env.REACT_APP_API_URL}/arentcar/manager/menus/${menuCode}`,
  //     newMenu,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     }
  //   );
  //   setMenus((prevMenu) => prevMenu.map(menu => menu.mMenu_code === menuCode ? newMenu : menu));
  //   alert("자료가 수정되었습니다.");
  // };
  
  // const createMenu = async (token, newMenu) => {
  //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/arentcar/manager/menus`, 
  //     newMenu,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       withCredentials: true,
  //     });
  //   newMenu.menu_code = response.data.menu_code;
  //   newMenu.menu_password = response.data.menu_password;
  //   setMenus((prevMenu) => [...prevMenu, newMenu]);
  //   alert("자료가 등록되었습니다.");
  // };

  const handlePopupCloseClick = () => {
    setIsPopUp(false);
  };

  const handleCloseClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const validateCheck = () => {
    if (!carTypeName || carTypeName.trim() === '') {
      alert("차종구분을 입력해주세요.");
      return false;
    };
    if (!carImageName || carImageName.trim() === '') {
      alert("차량이미지명을 입력해주세요.");
      return false;
    };
    if (!carNumber || carNumber.trim() === '') {
      alert("차량번호를 입력해주세요.");
      return false;
    };
    if (!modelYear || modelYear.trim() === '') {
      alert("년식을 입력해주세요.");
      return false;
    };
  
    return true; 
  };

  const totalWidth = columnDefs.reduce((sum, columnDef) => {
    return sum + (columnDef.width ? columnDef.width : 150);
  }, 0);

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  let totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages < 1) {
    totalPages = 1;
  }

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
            <span>[검색건수 : {totalCount}건]</span>
          </div>
          <div>
            <button className='manager-button manager-button-insert' onClick={() => handleInsertClick("등록")}>추가</button>
            <button className='manager-button manager-button-close' onClick={() => handleCloseClick()}>닫기</button>
          </div>
        </div>
      </div>

      <div className="car-info-content-wrap">
        <div className="car-info-content-header">
          {columnDefs.map((title, index) => (
           <div key={index} className='manager-head-column' style={{ width: `${title.width}px`, textAlign: `center` }}>{title.headerName}</div>
          ))}
        </div>
        <div className="car-info-content-row-wrap">
          {menus.map((row, index) => (
            <div key={index} className='register-menu-content-row'>
              {columnDefs.map((title, index) => (
                <div
                  key={index} className='manager-row-column'
                  style={{
                    ...(title.field === '' ? { display: 'flex' } : ''),
                    ...(title.field === '' ? { alignItems: 'center' } : ''),
                    ...(title.field === '' ? { justifyContent: 'center' } : ''),
                    width: `${title.width}px`,
                    textAlign: `${title.align}`
                  }}
                >
                  {title.field === '' ? (
                    <>
                      <button className='manager-button manager-button-update' onClick={() => handleUpdateClick(row, "수정")}>수정</button>
                      <button className='manager-button manager-button-delete' onClick={() => handleDeleteClick(row.menu_code)}>삭제</button>
                    </>
                  ) : (
                      row[title.field]
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="car-info-row-content-wrap"></div>

        {isPopUp &&
          <div className='manager-popup'>
            <div className='car-info-content-popup-wrap'>
              <div className='car-info-content-popup-close'>
                <div className='manager-popup-title'>● 차량{workMode}</div>
                <div className='car-info-content-popup-button'>
                  <button className='manager-button manager-button-save' onClick={handleDataSaveClick}>저장</button>
                  <button className='manager-button manager-button-close' onClick={handlePopupCloseClick}>닫기</button>
                </div>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">메뉴코드</label>
                <input className='width50  word-center' type="text" value={menuCode} disabled />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차종구분</label>
                <select className='width100' id="comboBox" value={carTypeCategory} onChange={(e) => (setCarTypeCategory(e.target.value))}>
                  {optionsMenuCarTypeCategory.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차종명</label>
                <input className='width100 word-center' type="text" placeholder="KG모빌리티" maxLength={6} value={carTypeName} onChange={(e) => setCarTypeName(e.target.value)} />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">수용인원</label>
                <select className='width100' id="comboBox" value={seatingCapacity} onChange={(e) => (setSeatingCapacity(e.target.value))}>
                  {optionsMenuSeatingCapacity.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">연료</label>
                <select className='width100' id="comboBox" value={fuelType} onChange={(e) => (setFuelType(e.target.value))}>
                  {optionsMenuFuelType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">속도제한</label>
                <select className='width100' id="comboBox" value={speedLimit} onChange={(e) => (setSpeedLimit(e.target.value))}>
                  {optionsMenuSpeedLimit.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">면허제한</label>
                <select className='width100' id="comboBox" value={licenseRestriction} onChange={(e) => (setLicenseRestriction(e.target.value))}>
                  {optionsMenuLicenseRestriction.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">제조사</label>
                <select className='width100' id="comboBox" value={carManufacturer} onChange={(e) => (setCarManufacturer(e.target.value))}>
                  {optionsMenuCarManufacturer.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차량이미지명</label>
                <input className='width100  word-center' type="text" placeholder="kia2024morning.png" value={carImageName} onChange={(e) => (setCarImageName(e.target.value))} />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">차량번호</label>
                <input className='width100  word-center' type="text" placeholder="가12345" value={carNumber} onChange={(e) => {setCarNumber(e.target.value)}} />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">년식</label>
                <input className='width100  word-center' type="text" placeholder="2024" value={modelYear} onChange={(e) => {setModelYear(e.target.value)}} />
              </div>
              <div className='car-info-content-popup-line'>
                <label className='width80 word-right label-margin-right' htmlFor="">지점명</label>
                <select className='width100' id="comboBox" value={branchName} onChange={(e) => (setBranchName(e.target.value))}>
                  {optionsMenuBranchName.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }
      </div>
      <div className='car-info-pageing-wrap flex-align-center'>
        <button 
          className='manager-button'
          style={{color: pageNumber === 1 ?  '#aaa' : 'rgb(38, 49, 155)'}} 
          onClick={() => handlePageChange(pageNumber - 1)} 
          disabled={pageNumber === 1}
        >이전</button>
        <div className='car-info-pageing-display'>{pageNumber} / {totalPages}</div>
        <button 
          className='manager-button' 
          style={{color: pageNumber === totalPages ?  '#aaa' : 'rgb(38, 49, 155)'}} 
          onClick={() => handlePageChange(pageNumber + 1)} 
          disabled={pageNumber === totalPages}
        >다음</button>
      </div>
    </div>
  );
};

export default CarInfo;
