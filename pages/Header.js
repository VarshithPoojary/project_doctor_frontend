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
import {caretaker_list_by_id } from "../actions/registrationAction";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [values, setValues] = useState({
    doc_list:[],
    doc_profile_image: '',
    doc_username:'',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {doc_list, doc_profile_image, error, loading, message, showForm } = values;

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (user_id === "" || user_id === null || user_id === undefined) { 
        Router.push('/login');
      } else {
        loadUserDetails(user_id);
      }
    }
  }, []);

  const handleDoctor = () => {
    Router.push('/caretakerprofile');
  };

  const handleDashboard = () => {
    Router.push('/#');
  };
  const handleBookedApp = () => {
    Router.push('/Appointment');
  };
  const handleAcceptedApp = () => {
    Router.push('/ViewAppointments');
  };
  const handleAdmin = () => {
    Router.push('/slot');
  };
  const handleslots = () => {
    Router.push('/viewslots');
  };
  const handlecompletedApp = () => {
    Router.push('/appointmentlist');
  };

  const handleLogout = () => {
    localStorage.removeItem('id');
    Router.push('/login');
  };


  const loadUserDetails = (user_id) => {
    caretaker_list_by_id(user_id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, 
            doc_profile_image: data.caretaker_list[0].caretaker_profile_image, 
            doc_username: data.caretaker_list[0].caretaker_firstname,
            doc_list: data.caretaker_list, loading: false });
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
        <ProSidebar collapsed={menuCollapse} style={{backgroundColor:'#3e34d0'}}>
          <SidebarHeader style={{backgroundColor:'#3e34d0'}}>
            <div className="logotext" style={{backgroundColor:'#3e34d0'}}>
              <p>{menuCollapse ? "" : ""}</p>
            </div>
            <div className="closemenu"  onClick={menuIconClick}>
              <FiMenu />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Scrollbars style={{ backgroundColor:'#3e34d0',width: '100%', height: '100%' }}>
              <Menu iconShape="square">
                <MenuItem icon={<FiHome />} title="Dashboard" onClick={handleDashboard}>
                  <Link href='#'><span>Home</span></Link>
                </MenuItem>
                <MenuItem icon={<BiCalendarPlus />} title="Add" onClick={handleAdmin}>
                <Link href='/slot'><span>New Slot</span></Link>
                </MenuItem>
                <MenuItem icon={<BiClinic />} title="Doctor" onClick={handleDoctor}><Link  href='/caretakerprofile'><span>Doctor</span></Link></MenuItem>
                <MenuItem icon={<BiBriefcase />} title="appointments" onClick={handleBookedApp}><Link  href='/Appointment'><span> Booked Appointment</span></Link></MenuItem>
                <MenuItem icon={<BiUserPlus />} title="appointments" onClick={handleAcceptedApp}><Link href='/ViewAppointments'><span>Accepted Appointments</span></Link></MenuItem>
                <MenuItem icon={<BiUserPlus />} title="appointments"  onClick={handlecompletedApp}><Link  href='/appointmentlist'><span>History</span></Link></MenuItem>
                <MenuItem icon={<BiCalendarPlus />} title="slots" onClick={handleslots}><Link href='/viewslots'><span>Slots</span></Link></MenuItem>
               {/* <SubMenu title="Appointments" icon={<FiMapPin />}  >
                  <MenuItem title="appointments" icon={<BiMap />} >
                  <Link  href='/Appointment'><span> Booked Appointment</span></Link></MenuItem>
                  <MenuItem title="State" icon={<BiMap />} >
                  <Link href='/ViewAppointments'><span>Accepted Appointments</span></Link></MenuItem>
                  <MenuItem title="City" icon={<BiMap />} >
                  <Link href='/Location/viewCity'><span>City</span></Link></MenuItem>
                </SubMenu>*/}
              </Menu>
            </Scrollbars>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square"style={{backgroundColor:'#3e34d0'}}>
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
