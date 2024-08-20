import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import Router from 'next/router';
import { FiHome, FiBell, FiSettings, FiUser } from 'react-icons/fi'; 
import { caretaker_list_by_id } from '../actions/registrationAction';

const Topbar = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [values, setValues] = useState({
    caretaker_list:[],
    caretaker_firstname: '',
    caretaker_lastname: '',
    caretaker_profile_image: '',
    caretaker_password: '',
    caretaker_phone_number: '',
    caretaker_email:'',
   // admin_username: '',
    //admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const {caretaker_list,caretaker_profile_image, error, loading, message, showForm } = values;

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const user_id = localStorage.getItem('id');
        if (user_id === ""|| user_id === null||user_id === undefined) {
          Router.push('/login');
        } else {
          loadUserDetails(user_id);
        }
      

   

    // $('.button-menu-mobile').on('click', function (event) {
    //   event.preventDefault();
    //   $('body').toggleClass('sidebar-enable');
    //   if ($(window).width() >= 768) {
    //     console.log("enlarge")
    //     $('body').toggleClass('enlarged');

    //   } else {
    //     $('body').removeClass('enlarged');
    //   }
    // });
    // // Topbar - main menu
    // $('.navbar-toggle').on('click', function (event) {
    //   console.log("mobile")
    //   $(this).toggleClass('open');
    //   $('#navigation').slideToggle(400);
    // });
      }

  }, []);
  
const loadUserDetails = (user_id) => {
  caretaker_list_by_id(user_id).then(data => {
    if (data.error) {
      console.log(data.error);
      setValues({ ...values, error: data.error, loading: false });
    } else {
      const caretakerData = data.caretaker_list[0];
      setValues({ ...values,
        caretaker_profile_image: caretakerData.caretaker_profile_image || defaultProfileImage,     
         loading: false });
    }
  }).catch(error => {
    console.error('Error:', error);
    setValues({ ...values, error: 'Error: Network request failed', loading: false });
  });
}


  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const signupForm = () => {
    return (
      <div id="wrapper" style={{backgroundColor:'#3e34d0'}}>
        <div className="navbar-custom"style={{backgroundColor:'#3e34d0'}}>
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
            <Link href="#">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FiHome /> Dashboard</span>
              </a>
              </Link>
            </li>
            <li className="dropdown notification-list">
              
              <a href="#" className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FiBell /> Notification</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a href='#' className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FiSettings /> Settings</span>
              </a>
            </li>
            <li className="dropdown notification-list">
            <Link href="/caretakerprofile">
              <a  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1 topbar-nav-link" ><FiUser /> Profile</span>
              </a>
              </Link>
            </li>
            <li className="dropdown notification-list">
              <Link href='/caretakerprofile'>
              <a  className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" role="button" aria-haspopup="false" >
                <span className="ml-1" style={{ color: "black" }}>
                  <img src={caretaker_profile_image} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                </span>
              </a>
              </Link>
           
            </li>
          </ul>

          {/* <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button className="button-menu-mobile waves-effect waves-light" >
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul> */}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {signupForm()}
    </React.Fragment>
  );
};

export default Topbar;
