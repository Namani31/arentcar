import React, { useEffect, useState } from 'react';
import { formatPhone, refreshAccessToken } from "common/Common";
import axios from 'axios';
import 'user/content/MyPageDetail.css'
import 'index.css'
import { useParams } from 'react-router-dom';

const MyPageDetail = ({onClick}) => {
	const{userCode} = useParams();
	console.log("라우트에서 추출한 userCode : ", userCode);

	const [userPage, setUserPage] =useState({
		user_name:"",
		user_email:"",
		user_phone_number:"",
		user_birth_date:"",
		driver_license_number:"",
		license_issuance_date:"",
		license_expiry_date:"",
	});


	// 사용자 정보 불러오기
	const getUserPage = async (token) => {	

		if (!userCode) {
			console.error('userCode is missing.');
			return;
		}	

		try {
			let token = localStorage.getItem('token');
			if (!token) {
				token = await refreshAccessToken();
			}
			
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/arentcar/user/mypagedetail/${userCode}`,
        {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true,
      }
		);

		console.log("API응답 테이터 : ", response.data);

      if (response.data){
				setUserPage(response.data);
				console.log("userPage상태 : ", response.data);
      }
		} catch (error) {
			console.error('데이터를 불러오지 못했습니다', error);
		}
	};

	// 사용자 정보 업데이트
	const fetchUpdateData = async () => {
	
		try {
			const token = localStorage.getItem('accessToken');
			console.log("업데이트 요청 토큰: ", token); // 토큰 확인
			console.log("업데이트할 데이터: ", userPage); // 업데이트 데이터 확인

			if (!token) {
				alert('로그인이 필요합니다');
				return;
			}

			// userPage 데이터가 비어있는 경우 처리
			if (!userPage || Object.keys(userPage).length === 0) {
			alert('업데이트할 데이터가 없습니다.');
			return;
	}

			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/arentcar/user/mypagedetail/${userCode}`,
				userPage, // userPage 객체로 업데이트
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials:true,
				}
			);

			console.log("업데이트 응답 : ", response);

			if (response.status === 204) {
				alert('테이터가 성공적으로 업데이트 되었습니다');
			} else {
				console.error('업데이트에 실패했습니다', response);
			}
		} catch (error) {
			console.error('데이터 업데이트 중 에러가 발생했습니다', error);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log("token:", token);
		console.log("userCode:", userCode);

		if (token && userCode){
			getUserPage(token);
		}
	}, [userCode]);

	  // 입력 유효성 검사
		const validateInputs = () => {
			if (!userPage.user_birth_date || !userPage.user_phone_number) {
				alert("모든 필드를 올바르게 입력해주세요.");
				return false;
			}
			if (!/^\d{4}-\d{2}-\d{2}$/.test(userPage.user_birth_date)) {
				alert("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
				return false;
			}
			if (!/^\d{10,11}$/.test(userPage.user_phone_number.replace(/-/g, ''))) {
        alert("휴대폰 번호는 10~11자리 숫자로 입력해주세요.");
        return false;
			}
				return true;
		};

	const handleSaveClick = () => {
		if (validateInputs()) {
			fetchUpdateData();
		}
	};

	const handleCloseClick = () => {
    if (onClick) {
      onClick();
    } else {
			console.warn("No onClick function provided for closing popup.")
		}
  };

	const handleInputChange = (e) => {
		const {name, value} =e.target;
		console.log(`입력변경 - 필드 : ${name}, 값 : ${value}`);
		setUserPage((prev) => ({...prev, [name] : value}));
	}


	return (
		<div className="mypage-detail-update-wrap">
			<div className='mypage-detail-update-contents-wrap'>
				<div className="mypage-detail-update-contents">
					<div className="mypage-detail-update-title">
						<div className='mypage-detail-update-title-name'>
						 	<p>기본 정보 확인</p>
						</div>
						<div className="mypage-detail-update-close">
							<button 
							className='mypage-detail-update-close-button'
							onClick={handleCloseClick}>닫기</button>
						</div>
					</div>
					<div className="mypage-detail-update-basic-info-wrap">
						<div className='mypage-detail-update-basic-info-name-section'>
							<div className="mypage-detail-update-basic-info-name width200">
								<p>이름</p>
							</div>
							<div className="mypage-detail-update-basic-info-data width200">
								{userPage.user_name || "데이터가 없음"}
							</div>
						</div>
						<div className='mypage-detail-update-basic-info-email-section'>
							<div className="mypage-detail-update-basic-info-email width200">
								<p>이메일</p>
							</div>
							<div className="mypage-detail-update-basic-info-data width200">
								{userPage.user_email}
							</div>
						</div>
						<div className='mypage-detail-update-basic-info-bitrhday-section'>
							<div className="mypage-detail-update-basic-info-birthday ">
								<label 
								className='width200' htmlFor="">생년월일</label>
								<input 
								className='width200' 
								type="text" 
								value={userPage.user_birth_date}
								onChange={handleInputChange} 
								/>
							</div>
						</div>
						<div className='mypage-detail-update-basic-info-cellphone-section'>
							<div className="mypage-detail-update-basic-info-cellphone ">
								<label className='width200' htmlFor="">휴대폰 번호</label>
								<input 
								className='width200' 
								type="tel" 
								value={formatPhone(userPage.user_phone_number)}
								onChange={handleInputChange}
								 />
							</div>
						</div>
					</div>
					<div className="mypage-detail-update-sub-info-addinfo">
						<div className="mypage-detail-update-sub-info-title">
							<p>추가 정보 확인</p>
						</div>
						<div className="mypage-detail-update-sub-info-box">
							<div className="mypage-detail-update-sub-info-section">
									<label className='width200' htmlFor="">운전 면허 번호</label>
									<input 
									className='width200' 
									type="text" 
									value={userPage.driver_license_number}
									onChange={handleInputChange}
									 />
							</div>
							<div className="mypage-detail-update-sub-info-section-created-date">
								<label className='width200' htmlFor="">운전 면허 발급일</label>
								<input 
								className='width200' 
								type="text" 
								value={userPage.license_issuance_date}
								onChange={handleInputChange}
								/>
							</div>
							<div className="mypage-detail-update-sub-info-section-updated-date">
								<label className='width200' htmlFor="">운전 면허 갱신일</label>
								<input className='width200' 
								type="text" 
								value={userPage.license_expiry_date}
								onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
					<div className='mypage-detail-update-sub-info-save-box'>
						<div></div>
						<div className='mypage-detail-update-sub-info-save'>
							<button 
							className=''
							onClick={handleSaveClick}>저장</button>
						</div>
					</div>
				</div>
				<div className="mypage-detail-update-signout">
						<div >
							<p>회원탈퇴 확인</p>
						</div>
					<div className='mypage-detail-update-signout-box'>
						<div className="">
							<button className=''>회원탈퇴 버튼</button>
						</div>
				</div>
				</div>
			</div>
		</div>
	);
};

export default MyPageDetail;
