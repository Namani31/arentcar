import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { refreshAccessToken, handleAdminLogout } from 'common/Common';
import Loading from 'common/Loading';
import "manager/managebranchs/ManageBranchs.css";

const ManageBranchs = ({ onClick }) => {
    const [branchs, setBranchs] = useState([]);
    const [isPopUp, setIsPopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [workMode, setWorkMode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;

    const [columnDefs] = useState([
        { headerName: '코드', field: 'branch_code', width: 70, align: 'center' },
        { headerName: '지점명', field: 'branch_name', width: 110, align: 'center' },
        { headerName: '주소', field: 'branch_detailed_address', width: 200, align: 'center' },
        { headerName: '지역이름', field: 'region_name', width: 130, align: 'center' },
        { headerName: '우편번호', field: 'post_code', width: 130, align: 'center' },
        { headerName: '개점시간', field: 'available_pickup_time', width: 100, align: 'center' },
        { headerName: '폐점시간', field: 'available_return_time', width: 80, align: 'center' },
    ]);

    const [branchCode, setbranchCode] = useState("");
    const [branchName, setbranchName] = useState("");
    const [regionName, setregionName] = useState("");
    const [postCode, setpostCode] = useState("");
    const [branchDetailedAddress, setbranchDetailedAddress] = useState("");
    const [availablePickupTime, setavailablePickupTime] = useState("");
    const [availableReturnTime, setavailableReturnTime] = useState("");

    const pageingBranchs = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await getBranchs(token);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                try {
                    const newToken = await refreshAccessToken();
                    await getBranchs(newToken);
                } catch (error) {
                    alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
                    handleAdminLogout();
                }
            } else {
                console.error('There was an error fetching the admins pageing!', error);
            }
        }
    };

    const getBranchs = async (token) => {
        const params = {
            pageSize,
            pageNumber,
        };

        if (searchName && searchName.trim() !== '') {
            params.branchName = searchName;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs/paged`,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });

        if (response.data) {
            setBranchs(response.data);
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
                    handleAdminLogout();
                }
            } else {
                console.error('There was an error fetching the branchs count!', error);
            }
        }
    };

    const getCount = async (token) => {
        const params = searchName ? { branchCode: searchName } : {};

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/branchs/count`,
            {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true,
            });

        if (typeof response.data === 'number') {
            console.log(response.data);
            setTotalCount(response.data);
        } else {
            console.error('Unexpected response:', response.data);
        }
    };

    useEffect(() => {
        pageingBranchs();
        getTotalCount();
    }, [pageNumber, pageSize]);

    const totalWidth = columnDefs.reduce((sum, columnDef) => {
        return sum + (columnDef.width ? columnDef.width : 150);
    }, 0);

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber); // 변경된 현재 페이지 번호(-1씩 또는 +1씩 가감)
    };

    let totalPages = Math.ceil(totalCount / pageSize); // 총 페이지 수 = 올림(전체 차종 수 / 화면에 보여줄 데이터 수(현재 페이지에서는 10개씩 보여줌))
    if (totalPages < 1) {
        totalPages = 1;
    }

    const handleSearchClick = async () => {
        pageingBranchs();
        getTotalCount();
    };

    const handleCloseClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handlePopupClodeClick = () => {
        setIsPopUp(false);
    };


    return (
        <div className='register-branch-wrap'>
            <div className='register-branch-header-wrap'>
                <div className='register-branch-title-wrap'>
                    <div className='manager-title'>● 지점등록</div>
                </div>
                <div
                    className='register-branch-button-wrap'
                    style={{ width: `${totalWidth}px` }}
                >
                    <div className='flex-align-center'>
                        <label className='manager-label' htmlFor="">지점명</label>
                        <input className='width200' type="text" value={searchName} onChange={(e) => (setSearchName(e.target.value))} />
                        <button className='manager-button manager-button-search' onClick={() => handleSearchClick()}>검색</button>
                        <span>[검색건수 : {totalCount}건]</span>
                    </div>
                    <div>
                        <button className='manager-button manager-button-close' onClick={() => handleCloseClick()}>닫기</button>
                    </div>
                </div>
            </div>
            <div className='register-branch-content-wrap'>
                <div className='register-branch-content-header'>
                    {columnDefs.map((title, index) => (
                        <div key={index} className='manager-head-column' style={{ width: `${title.width}px`, textAlign: `center` }}>{title.headerName}</div>
                    ))}
                </div>
            </div>
            {isPopUp &&
                <div className='manager-popup'>
                    <div className='register-branch-content-popup-wrap'>
                        <div className='register-branch-content-popup-close'>
                            <div className='manager-branch-title'>● 관리자{workMode}</div>
                            <div className='register-branch-content-popup-button'>
                                <button className='manager-button manager-button-close' onClick={handlePopupClodeClick}>닫기</button>
                            </div>
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-center label-margin-right' htmlFor="">지점코드</label>
                            <input className='width50 word-center' type="text" value={branchCode} disabled />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">지점명</label>
                            <input className='width300 word-center' value={branchName} type="text" maxLength={30} onChange={(e) => setbranchName(e.target.value)} />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">지역이름</label>
                            <input className='width300 word-center' value={regionName} type="text" maxLength={50} disabled onChange={(e) => setregionName(e.target.value)} />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">우편번호</label>
                            <input className='width300' type="text" value={postCode} maxLength={50} onChange={(e) => setpostCode(e.target.value)} />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">주소</label>
                            <input className='width300' type="text" value={branchDetailedAddress} maxLength={50} onChange={(e) => setbranchDetailedAddress(e.target.value)} />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">개점시간</label>
                            <input className='width300' type="text" value={availablePickupTime} maxLength={50} onChange={(e) => setavailablePickupTime(e.target.value)} />
                        </div>
                        <div className='register-branch-content-popup-line'>
                            <label className='width80 word-right label-margin-right' htmlFor="">폐점시간</label>
                            <input className='width300' type="text" value={availableReturnTime} maxLength={50} onChange={(e) => setavailableReturnTime(e.target.value)} />
                        </div>
                    </div>
                </div>
            }
            <div className='register-branchs-content-row-wrap'>
                {branchs.map((row, index) => (
                    <div key={index} className='register-branchs-content-row'>
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
                                {row[title.field]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='branch-info-pageing-wrap flex-align-center'>
                <button
                    className='manager-button'
                    style={{ color: pageNumber === 1 ? '#aaa' : 'rgb(38, 49, 155)' }}
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >이전</button>
                <div className='branch-info-pageing-display'>{pageNumber} / {totalPages}</div> {/* 현재 페이지 / 전체 페이지 */}
                <button
                    className='manager-button'
                    style={{ color: pageNumber === totalPages ? '#aaa' : 'rgb(38, 49, 155)' }}
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                >다음</button>
            </div>

            {loading && (
                <Loading />
            )}
        </div>
    );
}

export default ManageBranchs