import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderMenu from 'user/header/HeaderMenu';
import ContentHome from 'user/content/ContentHome';
import UserLogin from 'user/content/UserLogin';
import UserMemberShip from 'user/content/UserMemberShip';
import NaverCallback from 'user/content/NaverCallback';
import KakaoCallback from 'user/content/KakaoCallback';
import FooterMain from 'user/footer/FooterMain';
import Customers from 'user/content/Customers';
import Notices from 'user/content/Notices';
import Reviews from 'user/content/Reviews';

const UserMenu = () => {
  return (
    <div className="user-menu-wrap">
      <div className='user-menu-header-wrap'>
        <HeaderMenu />
      </div>
      <div className='user-menu-content-wrap'>
        <Routes>
          <Route path="/" element={<ContentHome />} ></Route>
          <Route path="/login" element={<UserLogin />} ></Route>
          <Route path="/membership" element={<UserMemberShip />} ></Route>
          <Route path="/naver-callback" element={<NaverCallback />} /> 
          <Route path="/kakao-callback" element={<KakaoCallback />} /> 
          {/* 고객지원 */}
          <Route path="/customers" element={<Customers />} ></Route>
          <Route path="/customers/NT/:postId" element={<Notices />} ></Route>
          <Route path="/customers/RV" element={<Reviews />} ></Route>
          <Route path="/customers/RV/:postId" element={<Reviews />} ></Route>

        </Routes>
      </div>
      <div className='user-menu-footer-wrap'>
        <FooterMain />
      </div>
    </div>
  );
}

export default UserMenu;