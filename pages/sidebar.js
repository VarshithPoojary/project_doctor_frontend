import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';
import { ImCalendar, ImMan } from "react-icons/im";
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCalendar2Fill } from "react-icons/bs";
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import { FiSettings, FiMapPin, FiPackage, FiImage, FiUserPlus } from "react-icons/fi";
import { BiUser, BiGroup, BiBluetooth } from "react-icons/bi";
import { HiOutlineHand, HiOutlineReceiptTax, HiOutlinePuzzle, HiCurrencyRupee, HiUserAdd, HiOutlinePlus, HiOutlineUserGroup, HiOutlineTruck, HiBriefcase } from "react-icons/hi";
import { FaRegFileAlt, FaSearchLocation, FiUserFiMapPinPlus } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";
import { GrDashboard, GrGift } from "react-icons/gr";


class Sidebar extends Component {

  ngAfterViewInit() {

    // sidebar - main menu  

  }
  componentDidMount() {

    //   $('.slimscroll-menu').slimscroll({
    //     height: 'auto',
    //     position: 'right',
    //     size: "6px",
    //     color: '#9ea5ab',
    //     wheelStep: 5,
    //     touchScrollStep: 20
    // });

    //  $("#side-menu").metisMenu({toggle:false  });

    $("#side-menu a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("mm-active"); // add active to li of the current link
        $(this).parent().parent().addClass("mm-show");
        $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("mm-active");
        $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
        $(this).parent().parent().parent().parent().parent().addClass("mm-active");
      }
    });

    //       $('.slimscroll-menu').slimscroll({
    //     height: 'auto',
    //     position: 'right',
    //     size: "6px",
    //     color: '#9ea5ab',
    //     wheelStep: 5,
    //     touchScrollStep: 20
    // });

    //        // sidebar - main menu
    //   $("#side-menu").metisMenu();

  }

  // activate the menu in left side bar based on url


  constructor() {
    super();
    //  window.postMessage('renderTable','*');
    this.state = {
      data: "",

    };
  }

  render() {

    const handleClick = (path) => {
      if (path === "/admin/login") {
        console.log("I clicked on the Login Page");
      }
      if (path === "/posts") {
        console.log("I clicked on the Posts Page");
      }
    };
    return (
      <div>


        <Head>
        </Head>
        {/* <div className="left-side-menu" >

          <Scrollbars style={{ width: '100%', height: '100%' }}> */}

        {/* <div id="sidebar-menu">

              <ul className="metismenu" id="side-menu">
                <li class="menu-title">Navigation</li>

                <li><Link href='/dashboard'><a><i className="fe-grid"></i><span>Dashboard</span></a></Link></li>
                <li><Link href='/user/viewUser' ><a><i><ImMan /></i><span>Guardian</span></a></Link></li>

                <li><Link href="/patient/viewPatient"><a ><i><BiUser /></i><span>Patients</span></a></Link></li> */}


        {/* <ul className="nav-second-level" aria-expanded="false" > */}
        {/* <li ><Link href="/patient/addPatient">Add Details</Link></li> */}
        {/* <li><Link href="/patient/viewPatient">View Details</Link></li> */}
        {/* </ul> */}



        {/* 
                <li><Link href='/caretakers/viewCaretakers' ><a><i><HiUserAdd /></i><span>Caretakers</span></a></Link></li>


                <li><a ><i><BiGroup /></i><span>Caretaker Details</span><span className="menu-arrow"></span></a>
                  <ul className="nav-second-level" aria-expanded="false" >
                    <li ><Link href="/caretakers/addCaretakerDetails">Add Caretaker Details</Link></li>
                    <li><Link href="/caretakers/viewCareTakerDetails">View Caretaker Details</Link></li>
                  </ul>
                </li> */}

        {/* <li><Link href='/caretakers/medkit' ><a><i><HiOutlinePlus /></i><span>Medkit</span></a></Link></li>

                <li><Link href="/appointment/viewAppointment"><a ><i><ImCalendar /></i><span>Book Appointment</span></a></Link></li> */}

        {/* <ul className="nav-second-level" aria-expanded="false" >
                    <li>View</li> */}
        {/* <li><Link href="/product/addProduct">Add Product</Link></li>
                    <li><Link href="/product/viewProduct">View Product</Link></li> */}
        {/* </ul> */}

        {/* <li><a ><i><BsFillCalendar2Fill /></i><span>Reports</span><span className="menu-arrow"></span></a>
                  <ul className="nav-second-level" aria-expanded="false" >
                    <li ><Link href="/reports/paymentDetails">Payments</Link></li>
                    <li><Link href="#">Today's Activity</Link></li>
                  </ul>
                </li> */}

        {/* <li><Link href='/adminuser/viewAdminuser' ><a><i><HiOutlineUserGroup /></i><span>Admin Users</span></a></Link></li> */}



        {/* <li><Link href='/caretakers/CaretakerServiceableAreas' ><a><i><HiOutlineTruck /></i><span>Caretakers Serviceable Areas</span></a></Link></li>

                <li><Link href='/caretakers/bankDetails' ><a><i><HiBriefcase /></i><span>Bank Details</span></a></Link></li>

                <li><Link href='/caretakers/targetDetails' ><a><i><HiOutlinePuzzle /></i><span>Targets</span></a></Link></li> */}


        {/* <li><a ><i><BiUser /></i><span>User Address</span><span className="menu-arrow"></span></a>
                  <ul className="nav-second-level" aria-expanded="false" > */}
        {/* <li ><Link href="/patient/addPatient">Add Details</Link></li> */}
        {/* <li><Link href="/userAddress/viewUserAddress">View Details</Link></li>
                    <li><Link href="/userAddress/addUserAddress">Add Details</Link></li>
                    

                  </ul>
                </li> */}


        {/* <li><Link href="/wound/viewWound"><a ><i><HiOutlineHand /></i><span>Wound</span></a></Link></li> */}
        {/* <ul className="nav-second-level" aria-expanded="false" > */}
        {/* <li ><Link href="/patient/addPatient">Add Details</Link></li> */}
        {/* <li><Link href="/wound/viewWound">View</Link></li> */}
        {/* <li><Link href="/wound/addWound">Add</Link></li> */}
        {/* 
                  </ul>
                </li> */}

        {/* <li><Link href='/caretakers/bankDetails' ><a><i><HiOutlineHome /></i><span>Bank Details</span></a></Link></li> */}




        {/* <li><a ><i><BiUser /></i><span>Product</span><span className="menu-arrow"></span></a>
                  <ul className="nav-second-level" aria-expanded="false" > */}
        {/* <li ><Link href="/patient/addPatient">Add Details</Link></li> */}
        {/* <li><Link href="/product/productCategory">Category</Link></li>
                    <li><Link href="/product/addProduct">Add Product</Link></li>
                    <li><Link href="/product/viewProduct">View Product</Link></li>
                  </ul>
                </li> */}



        {/* <li><a ><i><FiMapPin /></i><span>Settings</span><span className="menu-arrow"></span></a>
                  <ul className="nav-second-level" aria-expanded="false" >
                    <li ><Link href="/locations/addState">Add State</Link></li>
                    <li><Link href="/locations/addArea">Add Area</Link></li>
                  </ul>
                </li>
              </ul>
            </div> */}

        {/* </Scrollbars></div> */}
      
        <div className="left-side-menu" style={{backgroundColor:'#1891e0'}}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <ProSidebar>
              <Menu className='hideScrollbar'>
                <MenuItem icon={<GrDashboard />}><Link href='/dashboard'><a><span>Dashboard</span></a></Link></MenuItem>
                <MenuItem icon={<BiUser />}><Link href="/employee/viewEmployee"><a><span>Employee</span></a></Link></MenuItem>

                <MenuItem icon={<BiUser />}><Link href="/country/viewCountry"><a><span>Country</span></a></Link></MenuItem>
              </Menu>
            </ProSidebar>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default Sidebar;

