
import React, { Fragment, useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import { slot_listby_caretaker_id, slot_time_delete } from '../actions/caretakertypeAction'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const SlotView = () => {
    const [slotDetail, setSlotDetail] = useState([]);
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');

    useEffect(() => {
        loadSlotDetails();
    }, []);

    const loadSlotDetails = async () => {
        try {
            const caretaker_id = localStorage.getItem('id');
            if (!caretaker_id) {
                setMsg('No doctor ID found. Please log in again.');
                setMsgType('error');
                return;
            }

            console.log(`Fetching slots for caretaker ID: ${caretaker_id}`);

            const data = await slot_listby_caretaker_id(caretaker_id);

            console.log('Fetched data:', data);

            if (data.error) {
                console.error('Error fetching data:', data.error);
                setMsg('Failed to fetch slots. Please try again later.');
                setMsgType('error');
            } else if (Array.isArray(data.slot_list)) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); 

                
                let flattenedSlots = [];
                let serialNumber = 1;
                data.slot_list.forEach((slot) => {
                    const slotDate = new Date(slot.slot_date);
                    if (slotDate >= today) { 
                        slot.slot_timings.forEach((timing) => {
                            flattenedSlots.push({
                                sno: serialNumber++,
                                _id: slot._id + '_' + timing.slot_time, 
                                slot_date: slotDate.toISOString(), 
                                slot_time: timing.slot_time,
                                slot_status: timing.slot_status,
                                book_status: timing.book_status,
                                timings_delete_status: timing.timings_delete_status,
                                caretaker_firstname: slot.caretaker_firstname 
                            });
                        });
                    }
                });

                
                flattenedSlots.sort((a, b) => new Date(a.slot_date) - new Date(b.slot_date));

                console.log('Sorted and flattened slots:', flattenedSlots);

                setSlotDetail(flattenedSlots);
            } else {
                console.error('Unexpected data format:', data);
                setMsg('Unexpected data format. Please contact support.');
                setMsgType('error');
            }
        } catch (error) {
            console.error('Failed to load slot details:', error);
            setMsg('An unexpected error occurred. Please try again later.');
            setMsgType('error');
        }
    };

    const handleEdit = (row) => {
        Swal.fire({
            title: 'Edit Slot',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Edit',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Router.push({
                    pathname: '/Doctor/EditSlot', 
                    query: { _id: row._id, slot_time: row.slot_time }
                });
            }
        });
    };

   const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this slot?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await slot_time_delete(row._id); 

                    if (response.success) {
                        console.log(`Deleting slot with ID: ${row._id}`);
                        setMsg(`Slot on "${row.slot_date} at ${row.slot_time}" deleted successfully.`);
                        setTimeout(() => {
                            setMsg('');
                            loadSlotDetails();
                        }, 2000);
                    } else {
                        console.log(`Deleting slot with ID: ${row._id}`);
                        console.error('Failed to delete slot:', response.error);
                        setMsg('Failed to delete slot. Please try again later.');
                        setMsgType('error');
                    }
                } catch (error) {
                    console.error('Error deleting slot:', error.message);
                    setMsg('An unexpected error occurred. Please try again later.');
                    setMsgType('error');
                }
            }
        });
    };


    const actionFormatter = (cell, row) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    style={{ backgroundColor: "#d33", borderColor: "#d33", color: "#fff", padding: '5px 10px', borderRadius: '5px', transition: 'background-color 0.3s ease' }}
                    onClick={() => handleDelete(row)}
                    className="btn btn-sm">
                    <FiTrash2 />
                </button>
            </div>
        );
    };

    
    const groupedSlots = slotDetail.reduce((acc, slot) => {
        const slotDate = new Date(slot.slot_date).toLocaleDateString();
        if (!acc[slotDate]) {
            acc[slotDate] = [];
        }
        acc[slotDate].push(slot);
        return acc;
    }, {});

    return (
        <Fragment>
            <Head>
                <title>Slot List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            {/*<Topbar />*/}
            <div className="container mt-5">
            {/* <center><h2 style={{ marginBottom: '30px' }}><b> All Slot List</b></h2></center>*/}
            <center>
                <h2 style={{ marginBottom: '30px', color: '#3085d6', borderBottom: '2px solid #3085d6', paddingBottom: '10px' }}>
                    <b> Your Slots</b>
                </h2>
            </center>
                {msg && <div className={`alert alert-${msgType === 'error' ? 'danger' : 'success'}`} style={{ marginBottom: '20px' }}>{msg}</div>}

                {Object.keys(groupedSlots).length === 0 ? (
                    <div>No slots available.</div>
                ) : (
                    Object.keys(groupedSlots).map((date, index) => (
                        <div key={index} className="mb-5" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                            <h4 className="mb-3" style={{ backgroundColor: '#3085d6', color: '#fff', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>{date}</h4>
                            <BootstrapTable
                                data={groupedSlots[date]}
                                search={false}
                                pagination={false}
                                trClassName={(row, rowIndex) => rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                                tableStyle={{ border: 'none', borderRadius: '10px', overflow: 'hidden' }}
                                headerStyle={{ backgroundColor: '#f0f0f0', color: '#333', borderBottom: '1px solid #ddd', borderTop: 'none', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            >
                                <TableHeaderColumn dataField='_id' isKey hidden><b>ID</b></TableHeaderColumn>
                                <TableHeaderColumn dataField='sno' width="70" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                                <TableHeaderColumn dataField='slot_time' width='200' dataAlign='center' dataSort><b>Slot Time</b></TableHeaderColumn>
                                <TableHeaderColumn dataField='slot_status' width='150' dataAlign='center' dataSort><b>Slot Status</b></TableHeaderColumn>
                                <TableHeaderColumn dataField='book_status' width='150' dataAlign='center' dataSort><b>Booking Status</b></TableHeaderColumn>
                               {/* <TableHeaderColumn dataField='actions' width='150' dataAlign='center' dataFormat={actionFormatter}><b>Delete Slot</b></TableHeaderColumn>*/}
                            </BootstrapTable>
                        </div>
                    ))
                )}
            </div>
        </Fragment>
    );
};

export default SlotView;
