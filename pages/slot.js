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
                    Router.push(`/dashboard`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMsg('An unexpected error occurred. Please try again.');
            Router.push(`/dashboard`);
        }
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Add Slots</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Add Slot' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <Topbar />
            <Header />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header">Add Slots here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label>Slot Date:</label>
                                                <input 
                                                    type="date" 
                                                    value={slotDate} 
                                                    onChange={(e) => setSlotDate(e.target.value)} 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                {slotTimings.map((timing, index) => (
                                                    <div className="form-group" key={index}>
                                                        <label>Slot Time:</label>
                                                        <input 
                                                            type="text" 
                                                            name="slot_time" 
                                                            value={timing.slot_time} 
                                                            onChange={(e) => handleSlotTimingChange(index, e)} 
                                                            required 
                                                        />
                                                        {slotTimings.length > 1 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => handleRemoveSlotTiming(index)}
                                                            >
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button 
                                                    style={{ backgroundColor: "beige", width: "100px" }} 
                                                    type="button" 
                                                    onClick={handleAddSlotTiming}
                                                >
                                                    New Time Slot
                                                </button>
                                            </div>
                                            <br />
                                            <button 
                                                className="btn btn-primary" 
                                                type="submit" 
                                                style={{ background: "#3085d6", borderColor: "#0c9da8", width: "100px" }}
                                            >
                                                Add Slot
                                            </button>
                                            {loading && (<div className="alert alert-success margin-top-10">Loading...</div>)}
                                            {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
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
