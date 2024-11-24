import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'user/header/HeaderMenu.css';

const HeaderMenu = () => {
  const [menus, setMenus] = useState([]);
  const [activeMenuMain, setActiveMenuMain] = useState(null);
  const [activeMenuSub, setActiveMenuSub] = useState(null);
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/manager/menus`);
        if (response.data) {
          setMenus(response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the menu!', error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location]);

  const handleMenuMainMouseOver = (MainMenu) => {
    setActiveMenuMain(MainMenu);
  };

  const handleMenuMainMouseLeave = () => {
    setActiveMenuMain(null);
  };

  const handleMenuMainClick = (menu) => {
  };


  return (
    <div className='header-menu-wrap'>
      <div className='header-menu-top-logo'>
        <img className="manager-menu-logo-img" src={`${process.env.REACT_APP_IMAGE_URL}/arentcar.png`} alt="" />
      </div>
      <div className="header-menu-top-menu">
        <ul>
          {menus.filter(menu => menu.menu_kind === "1" && menu.menu_type === "1").map((mainMemu, index) => (
            <li
              key={index}
              onClick={() => handleMenuMainClick(mainMemu.menu_url)}
            >
              {mainMemu.menu_name}
            </li>
          ))}
        </ul>
      </div>
      <div className='header-menu-top-login'>
        <img className="manager-menu-login-img" src={`${process.env.REACT_APP_IMAGE_URL}/mypage.png`} alt="" />
      </div>
    </div>
  );
};

export default HeaderMenu;