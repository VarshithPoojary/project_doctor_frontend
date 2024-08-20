
import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar'; 
import { appointment_list_by_caretakerId_and_date, appointment_reject_accept1 } from '../actions/caretakertypeAction'; 

const AppointmentView = () => {
    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [msg, setMsg] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 

    const defaultProfileImage = '/images/userLogo.png'; 

    useEffect(() => {
        loadAppointmentDetails(selectedDate);
    }, [selectedDate]);

    const loadAppointmentDetails = async (date) => {
        try {
            const caretaker_id = localStorage.getItem('id');
            if (!caretaker_id) {
                setMsg('No doctor ID found. Please log in again.');
                return;
            }

            console.log(`Fetching appointments for caretaker ID: ${caretaker_id}`);

            const data = await appointment_list_by_caretakerId_and_date({ caretaker_id, date });
            console.log('Fetched data:', data);

            if (data.error) {
                console.error('Error fetching data:', data.error);
                setMsg('Failed to fetch appointments. Please try again later.');
            } else if (Array.isArray(data.appointment_list)) {
                const mappedAppointments = data.appointment_list.map((appointment, index) => ({
                    ...appointment,
                    sno: index + 1, 
                    patient_profile_image: appointment.patient_profile_img || defaultProfileImage
                }));

                console.log('Mapped Appointments:', mappedAppointments);
                setAppointmentDetail(mappedAppointments);
            } else {
                console.error('Unexpected data format:', data);
                setMsg('Unexpected data format. Please contact support.');
            }
        } catch (error) {
            console.error('Failed to load appointment details:', error);
            setMsg('An unexpected error occurred. Please try again later.');
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); 
    };

    const displayImage = (cell, row) => {
        return (
            <img
                src={row.patient_profile_image}
                alt="Profile"
                style={{ borderRadius: '50%', width: '50px', height: '50px' }}
            />
        );
    };

    const actionFormatter = (cell, row) => {
        return (
            <div className="action-buttons">
                <button  style={{backgroundColor:'#3e34d0'}} className="btn btn-primary" onClick={() => handleAccept(row)}>
                    Approve
                </button>
               &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={() => handleReject(row)}>
                    Reject
                </button>
            </div>
        );
    };

    const handleAccept = async (row) => {
        try {
            const result = await Swal.fire({
                title: 'Accept Slot',
                text: `Are you sure you want to accept the appointment for "${row.appointment_date} at ${row.slot_timing}"?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Accept',
                cancelButtonText: 'Cancel',
                showCloseButton: true,
            });

            if (result.isConfirmed) {
                const response = await appointment_reject_accept1({ appointmentId: row._id, status: 'Accepted' });
                if (response) {
                    setMsg(`Slot on "${row.appointment_date} at ${row.slot_timing}" accepted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 3000);
                    loadAppointmentDetails(selectedDate);
                } else {
                    setMsg('Failed to accept the slot. Please try again.');
                    Router.push({
                        pathname: '/Appointment',
                    });
                }
            }
        } catch (error) {
            console.error('Error accepting slot:', error);
            setMsg('An error occurred while accepting the slot. Please try again.');
            setTimeout(() => {
                setMsg('');
            }, 3000);
            loadAppointmentDetails(selectedDate);
        }
    };

    const handleReject = async (row) => {
        try {
            const result = await Swal.fire({
                title: 'Reject Slot',
                text: `Are you sure you want to reject this appointment for "${row.appointment_date} at ${row.slot_timing}"?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Reject',
                cancelButtonText: 'Cancel',
                showCloseButton: true,
            });

            if (result.isConfirmed) {
                const response = await appointment_reject_accept1({ appointmentId: row._id, status: 'Rejected' });
                if (response) {
                    setMsg(`Slot on "${row.appointment_date} at ${row.slot_timing}" rejected successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 3000);
                    loadAppointmentDetails(selectedDate);
                } else {
                    setMsg('Failed to reject the slot. Please try again.');
                    Router.push({
                        pathname: '/Appointment',
                    });
                }
            }
        } catch (error) {
            console.error('Error rejecting slot:', error);
            setMsg('An error occurred while rejecting the slot. Please try again.');
            setTimeout(() => {
                setMsg('');
            }, 3000);
            loadAppointmentDetails(selectedDate);
        }
    };

    return (
        <div className="appointment-view">
            <Head>
                <title>Booked Appointments</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            {/*<Topbar />*/}<br></br>
            <div className="container">
                <h2 className="text-center mb-4">Booked Appointments</h2>
                <div className="date-picker-container mb-4">
                    <label htmlFor="appointment-date">Choose Date:</label>
                    <input
                        type="date"
                        id="appointment-date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                  {/* <button style={{width:'200px',backgroundColor:'#3e34d0'}} className="btn btn-primary ml-2" onClick={() => loadAppointmentDetails(selectedDate)}>
                        View Appointments
                    </button>*/}
                </div>

                {msg && <div className="alert alert-success">{msg}</div>}

                <BootstrapTable
                    data={appointmentDetail}
                    search={true}
                    options={{ noDataText: 'No booked appointments to handle for the day' }}
                >
                    <TableHeaderColumn dataField='sno' width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='patient_profile_image' width='150px' dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                    <TableHeaderColumn dataField="patient_name" width='150px' dataAlign="center" dataSort><b>Patient Name</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="appointment_date" width='120px' dataAlign="center" dataSort><b>Appointment Date</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="slot_timing" width='150px' dataAlign="center" dataSort><b>Slot Time</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="status" width='100px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="actions" width='210px' dataAlign="center" dataFormat={actionFormatter}><b>Accept/Reject</b></TableHeaderColumn>
                </BootstrapTable>
            </div>
        </div>
    );
};

export default AppointmentView;
