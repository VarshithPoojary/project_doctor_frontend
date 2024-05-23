{/*import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { slot_list,DeleteDetails } from '../actions/caretakertypeAction';

const caretakerView = () => {
    const [slotDetail, setslotDetail] = useState([]);
    const [values, setValues] = useState({
        caretaker_profile_image:'',
        caretakerdetail: []
    });

    const defaultProfileImage = '/images/userLogo.png';
    const [msg, setMsg] = useState('')
    const {caretaker_profile_image, caretakerdetail} = values;
    useEffect(() => {
        loadcaretakerDetails();
    }, []);

    const loadcaretakerDetails = () => {
        doctor_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } 
            else {
                const loggedInDoctorId = localStorage.getItem('id');
                const filteredcaretaker = data.caretaker_list.filter(doctor => doctor._id !== loggedInDoctorId);
                setValues({
                    ...values,
                    caretaker_profile_image: data.caretaker_list[0].caretaker_profile_image || defaultProfileImage,
                    caretakerdetail: filteredcaretaker
                });
            }
        });
    }

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Choose Edit Option',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Profile Edit',
            cancelButtonText: 'Password Edit',
            showCloseButton: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push({
                    pathname: '/Doctor/EditDoctor',
                    query: {
                        _id: row._id,
                    }
                });
                    
            } else {
                Router.push({
                    pathname: '/Doctor/ViewDoctorList' ,
                    query: {
                        _id: row._id,
                    }
                });
            }
        });
    };
    


    const handleDelete = (row) => {
        const caretaker_deleted_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this DOCTOR!!!!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let query = { "_id": row._id, "caretaker_deleted_by_id": caretaker_deleted_by_id }
                DeleteDoctorDetails(query).then(data => {
                    loadcaretakerDetails();
                setMsg(`Doctor "${row.doctor_first_name}" deleted successfully.`);
                setTimeout(() => {
                    setMsg('');
                }, 2000); 
            });
         }
        });
    }

    function displayImage(cell, row) {
        return (
            <img
                src={row.caretaker_profile_image ? row.caretaker_profile_image : defaultProfileImage}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
            />
        );
    }
    

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="icons-edit"  style={{ backgroundColor: "#3085d6", borderColor: "#3085d6",width:"40px"}}  onClick={() => handleEdit(row)}>
                    <FiEdit  />
                </button>
                <button className="icons-delete"  style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)",width:"40px",marginLeft:"10%" }} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Doctors List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Doctors LIST</b></h2></center>
                    <Link href="/Doctor/AddDoctor">
                        <a className="btn btn-success mb-3"  style={{  background: "#3085d6",borderColor: "#0c9da8", width:'20%' }}>Add Doctors</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    
                    <BootstrapTable data={caretakerdetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField="doctor_unique_number" width="150" dataAlign="center" dataSort><b>Unique Number</b></TableHeaderColumn> 
                        <TableHeaderColumn dataField='caretaker_profile_image' width="90" dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="caretaker_firstname" width="120" dataAlign="center" dataSort><b>FirstName</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="caretaker_phone_number" width="120" dataAlign="center" dataSort><b>Mobile No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="caretaker_gender" dataAlign="center" dataSort><b>Gender</b></TableHeaderColumn> 
                        <TableHeaderColumn dataField="caretaker_email" width='200' dataAlign="center" dataSort><b>Email</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="caretaker_register_status" width='90' dataAlign="center" dataSort><b>RegisterStatus</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="caretaker_approvedStatus" width='90' dataAlign="center" dataSort><b> ApprovedStatus</b></TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter}  ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default caretakerView;*/}
