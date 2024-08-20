
import React, { Fragment, useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import Head from 'next/head';
import Header from './Header';
//import Topbar from './Topbar';
import {completed_appointmentlist_by_caretakerId} from '../actions/caretakertypeAction';
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

            console.log(`Fetching completed appointments for caretaker ID: ${caretaker_id}`);

            const data = await completed_appointmentlist_by_caretakerId(caretaker_id);

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

    
    const patientDetailsLink = (cell, row) => {
        return (
            <Link href={`/Viewcompleteddetails/${row._id}`}>
                <a className="btn btn-info" style={styles.detailsButton}>
                    View Details
                </a>
            </Link>
        );
    };




    return (
        <Fragment>
            <Head>
                <title>Appointments History</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
           
            <br></br><br></br>
            <div style={styles.container}>
                <h2 style={styles.heading}>Appointments History</h2>
                {msg && <div className="alert alert-info">{msg}</div>}

                <BootstrapTable
                    data={appointmentDetail}
                    search
                    containerStyle={styles.tableContainer}
                    headerStyle={styles.tableHeader}
                    bodyStyle={styles.tableBody}
                >
                    <TableHeaderColumn dataField='sno' width="60" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='patient_profile_image' width='150px' dataAlign="center" editable={false} dataFormat={displayImage} dataSort>Profile</TableHeaderColumn>
                    <TableHeaderColumn dataField="patient_name" width='150px' dataAlign="center" dataSort><b>Patient Name</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="appointment_date" width='150px' dataAlign="center" dataSort><b>Appointment Date</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="slot_timing" width='150px' dataAlign="center" dataSort><b>Slot Time</b></TableHeaderColumn>
                    <TableHeaderColumn dataField="status" width='100px' dataAlign="center" dataSort><b>Status</b></TableHeaderColumn>
                    {/*<TableHeaderColumn dataField="actions" width='130px' dataAlign="center" dataFormat={actionFormatter}><b>Cancel</b></TableHeaderColumn>*/}
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


