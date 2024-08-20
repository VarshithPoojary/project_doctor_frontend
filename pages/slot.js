
import Head from 'next/head';
import Router from 'next/router';
import Topbar from './topbar';
import Header from './Header';
import React, { useState } from 'react';
import { add_slot } from '../actions/caretakertypeAction';

const AddSlotForm = () => {
    const [slotDate, setSlotDate] = useState('');
    const [slotTimings, setSlotTimings] = useState([{ slot_time: '' }]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSlotTimingChange = (index, event) => {
        const newSlotTimings = [...slotTimings];
        newSlotTimings[index][event.target.name] = event.target.value;
        setSlotTimings(newSlotTimings);
    };

    const handleAddSlotTiming = () => {
        setSlotTimings([...slotTimings, { slot_time: '' }]);
    };

    const handleRemoveSlotTiming = (index) => {
        const newSlotTimings = [...slotTimings];
        newSlotTimings.splice(index, 1);
        setSlotTimings(newSlotTimings);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const adminId = localStorage.getItem('id');
       
        try {
            const slotData = {
                caretaker_id: adminId,
                slot_date: slotDate,
                slot_timings: slotTimings,
                created_by_id: adminId,
                updated_by_id: adminId,
            };

            const res = await add_slot(slotData);

            setLoading(false);
            if (res.error) {
                setMsg(res.msg || 'An error occurred. Please try again.');
            } else {
                setMsg('Added Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/caretakerprofile`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMsg('An unexpected error occurred. Please try again.');
            Router.push(`/caretakerprofile`);
        }
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Add Slots</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Add Slot" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page" style={{ padding: '20px' }}>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row justify-content-center" style={{justifyContent:'left'}}>
                            <div className="col-12">
                                <div className="card mb-4" style={{ maxWidth: '600px', margin: '70px 0 0 0' }}>
                                    <div className="card-header text-center">Add Slots here</div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Slot Date:</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={slotDate}
                                                    onChange={(e) => setSlotDate(e.target.value)}
                                                    required
                                                    style={{ width: '180px' }}
                                                />
                                            </div>
                                            <div>
                                                {slotTimings.map((timing, index) => (
                                                    <div className="form-group row align-items-center" key={index}>
                                                        <div className="col">
                                                            <label>Slot Time:</label>
                                                            <input
                                                                type="text"
                                                                name="slot_time"
                                                                className="form-control"
                                                                value={timing.slot_time}
                                                                onChange={(e) => handleSlotTimingChange(index, e)}
                                                                required
                                                                style={{ width: '100%',height:'50px' }}
                                                            />
                                                        </div>
                                                        {slotTimings.length > 1 && (
                                                            <div className="col-auto">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleRemoveSlotTiming(index)}
                                                                    style={{ marginTop: '24px' }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="10"
                                                                        height="10"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 10 10"
                                                                    >
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7A.5.5 0 0 1 10 13H6a.5.5 0 0 1-.5-.5v-7zm3 1v6H7v-6h1.5zm1.5-.5v6h-1v-6h1zm-6 0h1v6H4v-6h1zm1-1V4a1 1 0 1 1 2 0v1h-2zm3-1v1H6V4a1 1 0 1 1 2 0zm3.5 1H9.936L9.5 4H6.5L6.064 5H2.5v1h11V5zM3.5 1.5A1.5 1.5 0 0 1 5 0h6a1.5 1.5 0 0 1 1.5 1.5v1h-9v-1z"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={handleAddSlotTiming}
                                                    style={{ width: '140px',height:'35px' }}
                                                >
                                                    New Time Slot
                                                </button>
                                            </div>
                                            <br />
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                disabled={loading}
                                                style={{width:'140px',height:'35px' }}
                                            >
                                                Add Slot
                                            </button>
                                            {loading && (<div className="alert alert-info mt-3">Loading...</div>)}
                                            {msg && (<div className="alert alert-success mt-3">{msg}</div>)}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSlotForm;


