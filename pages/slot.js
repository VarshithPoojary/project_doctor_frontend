/*import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { add_slot } from '../actions/caretakertypeAction';

const AddSlotForm = () => {
    const [caretakerId, setCaretakerId] = useState('');
    const [slotDate, setSlotDate] = useState('');
    const [slotTimings, setSlotTimings] = useState([{ slot_time: '' }]);
    const [createdById, setCreatedById] = useState('');
    const [message, setMessage] = useState('');

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

        const data = {
            caretaker_id: caretakerId,
            slot_date: slotDate,
            slot_timings: slotTimings,
            created_by_id: createdById
        };

        try {
            const response = await add_slot(data);
            const result = await response.json();
            if (result.error) {
                setMessage(result.msg);
            } else {
                setMessage('Slot added successfully!');
            }
        } catch (error) {
            setMessage('An error occurred while adding the slot.');
        }
    };

    return (
        <div>
            <h2>Add Slot</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Caretaker ID:</label>
                    <input
                        type="text"
                        value={caretakerId}
                        onChange={(e) => setCaretakerId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Slot Date:</label>
                    <input
                        type="date"
                        value={slotDate}
                        onChange={(e) => setSlotDate(e.target.value)}
                        required
                    />
                </div>
                {slotTimings.map((timing, index) => (
                    <div key={index}>
                        <label>Slot Time:</label>
                        <input
                            type="text"
                            name="slot_time"
                            value={timing.slot_time}
                            onChange={(e) => handleSlotTimingChange(index, e)}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveSlotTiming(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddSlotTiming}>Add Slot Time</button>
                <div>
                    <label>Created By ID:</label>
                    <input
                        type="text"
                        value={createdById}
                        onChange={(e) => setCreatedById(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Slot</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSlotForm;*/

import Head from 'next/head';
import Router from 'next/router';
import Topbar from './topbar';
import Header from './Header';
import React, { useState } from 'react';

const AddSlotForm = () => {
  //  const [caretakerId, setCaretakerId] = useState('');
    const [slotDate, setSlotDate] = useState('');
    const [slotTimings, setSlotTimings] = useState([{ slot_time: '' }]);
   // const [createdById, setCreatedById] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

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
        const data = {
            caretaker_id: adminId,
            slot_date: slotDate,
            slot_timings: slotTimings,
            created_by_id: adminId
        };

        try {
            const response = await add_slot(data);
            const result = await response.json();
            if (result.error) {
                setMsg(result.msg);
            } else {
                setMsg('Slot added successfully!');
                setValues({ ...values, slot_date:'',slot_timings:'',loading: false });
                Router.push('/dashboard');
            }
        } catch (error) {
            setMsg('An error occurred while adding the slot.');
        }
    };

 /*   return (
        <div className="formcontainer">
            <h2>Add Slot</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Caretaker ID:</label>
                    <input
                        type="text"
                        value={caretakerId}
                        onChange={(e) => setCaretakerId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Slot Date:</label>
                    <input
                        type="date"
                        value={slotDate}
                        onChange={(e) => setSlotDate(e.target.value)}
                        required
                    />
                </div>
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
                            <button type="button" onClick={() => handleRemoveSlotTiming(index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddSlotTiming}>Add Slot Time</button>
                <div className="form-group">
                    <label>Created By ID:</label>
                    <input
                        type="text"
                        value={createdById}
                        onChange={(e) => setCreatedById(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Slot</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddSlotForm;
*/

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
                                  &nbsp;&nbsp;&nbsp;  <input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} required  />
                                            
                                        </div>
                                     <div>  <div className="form-group row">
                                        {slotTimings.map((timing, index) => (
                   <div className="form-group" key={index}>
                        <label>Slot Time:</label>
                        <input type="text" name="slot_time" value={timing.slot_time} onChange={(e) => handleSlotTimingChange(index, e)} required />
                        {slotTimings.length > 1 && (
                            <button type="button" onClick={() => handleRemoveSlotTiming(index)}>Remove</button>
                        )}
                    </div>
                ))}</div> 
                   <button style={{ backgroundColor:"beige", width:"100px" }} type="button" onClick={handleAddSlotTiming}>new Time Slot</button>     </div>                   
                                        
                                     <br></br>  
                                        <button className="btn btn-primary" type="submit" style={{  background: "#3085d6", borderColor: "#0c9da8",width:"100px"}}>Add Slot</button>
                                        {loading ? (<div className="alert alert-success margin-top-10">Added successfully</div>) : null}
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

