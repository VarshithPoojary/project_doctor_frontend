import React, { useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import Link from 'next/link';
import Router from 'next/router';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FiHome, FiLogOut, FiMenu, FiUser, FiMapPin, FiSettings } from "react-icons/fi";
import { BiCog, BiUser, BiBook, BiCalendar, BiMap, BiListCheck, BiClinic, BiUserPlus, BiBriefcase, BiCalendarPlus } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import { admin_details_by_id } from "../actions/adminprofileAction";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [values, setValues] = useState({
    admin_list:[],
    admin_profile_image: '',
    admin_username:'',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {admin_list, admin_profile_image, error, loading, message, showForm } = values;

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) { 
        Router.push('/login');
      } else {
        loadUserDetails(user_id);
      }
    }
  }, []);

  const handleDashboard = () => {
    Router.push('/dashboard');
  };

  const handleAdmin = () => {
    Router.push('/Admin/viewAdminList');
  };


  const handleLogout = () => {
    localStorage.removeItem('id');
    Router.push('/Home');
  };


  const loadUserDetails = (user_id) => {
    admin_details_by_id(user_id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, 
            admin_profile_image: data.admin_list[0].admin_profile_image, 
            admin_username: data.admin_list[0].admin_username,
            admin_list: data.admin_list, loading: false });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  return (
    <>
    
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "" : ""}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              <FiMenu />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Menu iconShape="square">
                <MenuItem icon={<FiHome />} title="Dashboard" onClick={handleDashboard}>
                  <Link href='/dashboard'><span>Dashboard</span></Link>
                </MenuItem>
                <MenuItem icon={<BiUser />} title="Admin" onClick={handleAdmin}>
                <Link href='/Admin/viewAdminList'><span>Admin</span></Link>
                </MenuItem>
                <MenuItem icon={<BiClinic />} title="Doctor">Doctor</MenuItem>
                <MenuItem icon={<BiUserPlus />} title="Patient">Patient</MenuItem>
                <MenuItem icon={<BiBriefcase />} title="Department">Department</MenuItem>
                <MenuItem icon={<BiCalendarPlus />} title="Appointment">Appointment</MenuItem>
                <SubMenu title="Locations" icon={<FiMapPin />}  >
                  <MenuItem title="Country" icon={<BiMap />} >
                  <Link href='/Location/viewCountry'><span >Country</span></Link></MenuItem>
                  <MenuItem title="State" icon={<BiMap />} >
                  <Link href='/Location/viewState'><span>State</span></Link></MenuItem>
                  <MenuItem title="City" icon={<BiMap />} >
                  <Link href='/Location/viewCity'><span>City</span></Link></MenuItem>
                </SubMenu>
              </Menu>
            </Scrollbars>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} title="Logout" onClick={handleLogout}> 
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
