import React, { Fragment, useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import { appointment_list} from '../actions/caretakertypeAction'; // Ensure the correct path

const AppointmentView = () => {
    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [msg, setMsg] = useState('');

    const defaultProfileImage = '/images/userLogo.png'; // Make sure the path is correct

    useEffect(() => {
        loadAppointmentDetails();
    }, []);

    const loadAppointmentDetails = async () => {
        try {
            
            const data = await appointment_list();
           
            if (data.error) {
                console.error(data.error);
            } else {
                // Mapping the data to include the default profile image if not provided
                const mappedAppointments = data.appointment_list.map((appointment, index) => ({
                    ...appointment,
                    sno: index + 1, // Adding a serial number for display purposes
                    patient_profile_image: appointment.patient_profile_img || defaultProfileImage
                }));

                setAppointmentDetail(mappedAppointments);
            }
        } catch (error) {
            console.error('Failed to load appointment details:', error);
        }
    };

    const displayImage = (cell, row) => {
        return (
            <img
                src={row.patient_profile_image} // Use the field name set during mapping
                alt="Profile Image"
                height="50px"
                width="50px"
                style={{ borderRadius: "50%" }}
            />
        );
    };

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button style={{ backgroundColor: "#3085d6", borderColor: "#3085d6", width: "40px" }} onClick={() => handleEdit(row)}>
                    <FiEdit />
                </button>
                <button style={{ backgroundColor: "rgb(225, 76, 76)", borderColor: "rgb(225, 76, 76)", width: "40px", marginLeft: "10%" }} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    };

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
                    query: { _id: row._id }
                });
            } else {
                Router.push({
                    pathname: '/ViewAppointments',
                    query: { _id: row._id }
                });
            }
        });
    };

    const handleDelete = (row) => {
        const caretakerDeletedById = localStorage.getItem('id');
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
                let query = { "_id": row._id, "caretaker_deleted_by_id": caretakerDeletedById }
                DeleteDoctorDetails(query).then(data => {
                    loadAppointmentDetails();
                    setMsg(`Doctor "${row.doctor_first_name}" deleted successfully.`);
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
                        <TableHeaderColumn dataField="sno" width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='patient_profile_image' dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                        <TableHeaderColumn dataField="patient_name" dataAlign="center" dataSort><b>Patient Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="appointment_date" dataAlign="center" dataSort><b>Appointment Date</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="slot_timing" width='150px' dataAlign="center" dataSort><b>Slot Time</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="status" width='100px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter} ><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default AppointmentView;
