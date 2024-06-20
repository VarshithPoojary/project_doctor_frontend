import React, { Fragment, useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import { appointment_list_by_caretakerId } from '../actions/caretakertypeAction'; // Ensure the correct path

const AppointmentsView = () => {
    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [msg, setMsg] = useState('');

    const defaultProfileImage = '/images/userLogo.png'; // Ensure the path is correct

    useEffect(() => {
        loadAppointmentDetails();
    }, []);

    const loadAppointmentDetails = async () => {
        try {
            const caretaker_id = localStorage.getItem('id');
            if (!caretaker_id) {
                setMsg('No doctor ID found. Please log in again.');
                setMsgType('error');
                return;
            }
    
            console.log(`Fetching appointments for caretaker ID: ${caretaker_id}`);
    
            const data = await appointment_list_by_caretakerId(caretaker_id);
    
            console.log('Fetched data:', data);
    
            // Check if there is an error field in the response data
            if (data.error) {
                console.error('Error fetching data:', data.error);
                setMsg('Failed to fetch appointments. Please try again later.');
               
            } 
            else if (Array.isArray(data.appointment_list)) {
                // Validate if appointment_list is an array
                const mappedAppointments = data.appointment_list.map((appointment, index) => ({
                    ...appointment,
                    sno: index + 1, // Adding a serial number for display purposes
                    patient_profile_image: appointment.patient_profile_img || defaultProfileImage
                }));
    
                console.log('Mapped Appointments:', mappedAppointments);
    
                setAppointmentDetail(mappedAppointments);
            } else {
                console.error('Unexpected data format:', data);
                setMsg('Unexpected data format. Please contact support.');
                setMsgType('error');
            }
        } catch (error) {
            console.error('Failed to load appointment details:', error);
            setMsg('An unexpected error occurred. Please try again later.');
            setMsgType('error');
        }
    };
    
    
    
    

    const displayImage = (cell, row) => {
        return (
            <img
                src={row.patient_profile_image}
                alt="Profile Image"
                height="50px"
                width="50px"
                //style={{ borderRadius: "50%" }}
            />
        );
    };

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button style={{ backgroundColor: "#3085d6", borderColor: "#3085d6", width: "80px" }} onClick={() => handleEdit(row)}>
                 Approve  {/*<FiEdit />*/}
                </button>
                <button style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)", width: "80px", marginLeft: "10%" }} onClick={() => handleDelete(row)}>
                  Disapprove {/*<FiTrash2 />*/}
                </button>
            </div>
        );
    };

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Approve Appointment',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes,Approve it!',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push({
                    pathname: '/Doctor/EditDoctor',
                    query: { _id: row._id }
                });
            } else {
                Router.push({
                    pathname: '/appointmentlist',
                    query: { _id: row._id }
                });
            }
        });
    };

    const handleDelete = (row) => {
        const caretakerDeletedById = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to disapprove this appointment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, disapprove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "caretaker_deleted_by_id": caretakerDeletedById }
                DeleteDoctorDetails(query).then(data => {
                    loadAppointmentDetails();
                    setMsg(`Appointment for "${row.patient_name}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000);
                });
            }
        });
    }

    return (
        <Fragment>
            <Head>
                <title>Appointment List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Topbar />
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>Appointment List</b></h2></center>
                    
                    {msg && <div className="alert alert-success">{msg}</div>}
                    
                    <BootstrapTable data={appointmentDetail} search={true}>
                        <TableHeaderColumn dataField='sno' width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='patient_profile_image' dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_name"  width='150px' dataAlign="center" dataSort><b>Patient Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="appointment_date" dataAlign="center" dataSort><b>Appointment Date</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="slot_timing" width='150px' dataAlign="center" dataSort><b>Slot Time</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="status" width='100px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" width='210px' dataAlign="center" dataFormat={actionFormatter} ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default AppointmentsView;
