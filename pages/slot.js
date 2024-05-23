import Head from 'next/head';
import Router from 'next/router';
import Topbar from './topbar';
import Header from './Header';
import React, { useState } from 'react';
import {add_slot} from '../actions/caretakertypeAction';

const AddSlotForm = () => {
  //  const [caretakerId, setCaretakerId] = useState('');
    const [slotDate, setSlotDate] = useState('');
    const [slotTimings, setSlotTimings] = useState([{ slot_time: '' }]);
   // const [createdById, setCreatedById] = useState('');
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
            const formData = new FormData();
            formData.append('caretaker_id',adminId);
            formData.append('slot_date',slotDate);
           // formData.append('slot_timings',slotTimings);
            formData.append('slot_time',slotTimings.slot_time);
            formData.append('created_by_id',adminId);
            formData.append('updated_by_id',adminId);

            const res = await add_slot(formData);
            //const res = await response.json();

            setLoading(false);
            if (res.msg) {
                setMsg(res.msg);
                setTimeout(() => setMsg(''), 1000);
            } else if (res.error) {
                setMsg('An error occurred. Please try again.');

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

