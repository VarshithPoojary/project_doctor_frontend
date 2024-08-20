
import React, { Fragment, useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import Head from 'next/head';
import Header from './Header';
//import Topbar from './Topbar';
import { accepted_appointmentlist_by_caretakerId, appointment_cancel } from '../actions/caretakertypeAction';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const AppointmentView = () => {
    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [msg, setMsg] = useState('');

    const defaultProfileImage = './images/userLogo.jpeg'; 

    useEffect(() => {
        loadAppointmentDetails();
    }, []);

    const loadAppointmentDetails = async () => {
        try {
            const caretaker_id = localStorage.getItem('id');
            if (!caretaker_id) {
                setMsg('No doctor ID found. Please log in again.');
                return;
            }

            console.log(`Fetching accepted appointments for caretaker ID: ${caretaker_id}`);

            const data = await accepted_appointmentlist_by_caretakerId(caretaker_id);

            if (data.error) {
                console.error('Error fetching data:', data.error);
                setMsg('Failed to fetch appointments. Please try again later.');
            } else if (Array.isArray(data.appointment_list)) {
                
                const mappedAppointments = data.appointment_list
                    .map((appointment, index) => ({
                        ...appointment,
                        sno: index + 1, 
                        patient_profile_image: appointment.patient_profile_img || defaultProfileImage
                    }))
                    .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

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

    const displayImage = (cell, row) => {
        return (
            <img
                src={row.patient_profile_image}
                alt="Profile Image"
                height="50px"
                width="50px"
                style={styles.profileImage}
            />
        );
    };

    const actionFormatter = (cell, row) => {
        return (
            <button
                className="btn btn-danger"
                style={styles.cancelButton}
                onClick={() => handleCancel(row)}
            >
                Cancel
            </button>
        );
    };

    const patientDetailsLink = (cell, row) => {
        return (
            <Link href={`/Viewpatients/${row._id}`}>
                <a className="btn btn-info" style={styles.detailsButton}>
                    View Details
                </a>
            </Link>
        );
    };

    


    const handleCancel = async (row) => {
        try {
            const result = await Swal.fire({
                title: 'Cancel Appointment',
                text: `Are you sure you want to cancel the appointment for "${row.appointment_date} at ${row.slot_timing}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Proceed to Cancel',
                cancelButtonText: 'Keep Appointment',
                showCloseButton: true,
            });

            if (result.isConfirmed) {
                const { value: cancelReason } = await Swal.fire({
                    title: 'Enter Cancellation Reason',
                    input: 'textarea',
                    inputLabel: 'Cancellation Reason',
                    inputPlaceholder: 'Type your reason here...',
                    inputAttributes: {
                        'aria-label': 'Type your reason here'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel'
                });

                if (cancelReason) {
                    const response = await appointment_cancel({
                        appointmentId: row._id,
                        cancelReason,
                        canceled_type: "Doctor",
                        user_id: localStorage.getItem('id') 
                    });

                    if (response && response.message) {
                        setMsg(`Appointment on "${row.appointment_date} at ${row.slot_timing}" cancelled successfully.`);
                        setTimeout(() => setMsg(''), 3000);
                        loadAppointmentDetails();
                    } else {
                        setMsg('Failed to cancel the appointment. Please try again.');
                    }
                }
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            setMsg('An error occurred while cancelling the appointment. Please try again.');
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Accepted Appointments</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
           
            <br></br><br></br>
            <div style={styles.container}>
                <h2 style={styles.heading}>Accepted Appointments</h2>
                {msg && <div className="alert alert-info">{msg}</div>}

                <BootstrapTable
                    data={appointmentDetail}
                    search
                    containerStyle={styles.tableContainer}
                    headerStyle={styles.tableHeader}
                    bodyStyle={styles.tableBody}
                    options={{ noDataText: 'No appointments to handle for the day' }}
                >
                    <TableHeaderColumn dataField='sno' width="60" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='patient_profile_image' width='150px' dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                    <TableHeaderColumn dataField="patient_name" width='150px' dataAlign="center" dataSort><b>Patient Name</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="appointment_date" width='150px' dataAlign="center" dataSort><b>Appointment Date</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="slot_timing" width='150px' dataAlign="center" dataSort><b>Slot Time</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="status" width='100px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter}><b>Cancel</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="details" width='150px' dataAlign="center" dataFormat={patientDetailsLink}><b>Patient Details</b></TableHeaderColumn>
                </BootstrapTable>
            </div>
        </Fragment>
    );
};


const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '1200px'
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold'
    },
    profileImage: {
        borderRadius: '50%'
    },
    cancelButton: {
        padding: '5px 15px',
        borderRadius: '5px',
        fontWeight: 'bold'
    },
    detailsButton: {
        padding: '5px 15px',
        borderRadius: '5px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#17a2b8',
        border: 'none',
        textDecoration: 'none',
        width:'120px'
    },
    tableContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    tableHeader: {
        backgroundColor: '#f8f9fa',
        color: '#333'
    },
    tableBody: {
        backgroundColor: 'white'
    }
};

export default AppointmentView;


