
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../Header'; 
import { useEffect, useState } from 'react';
import { appointment_list_by_id, appointment_disclaimer_update, admin_payment_list } from '../../actions/PatientAction'; 

const AppointmentDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [appointmentDetail, setAppointmentDetail] = useState([]);
    const [msg, setMsg] = useState('');
    const [newDisclaimer, setNewDisclaimer] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [updating, setUpdating] = useState(false); 
    const [payment, setPayment] = useState([]);
    const [treatment_fees_id, setTreatmentId] = useState('');
    const [amount, setAmount] = useState('');
    const [showToast, setShowToast] = useState(false); 

    useEffect(() => {
        if (id) {
            loadAppointmentDetails(id);
            loadTreatmentDetails();
        }
    }, [id]);

    const loadAppointmentDetails = async () => {
        try {
            if (!id) {
                setMsg('No Appointment found. Please check again.');
                return;
            }

            const data = await appointment_list_by_id(id);

            if (data.error) {
                console.error('Error fetching data:', data.error);
                setMsg('Failed to fetch appointments. Please try again later.');
            } else if (Array.isArray(data.appointment_list)) {
                
                const mappedAppointments = data.appointment_list.map((appointment, index) => ({
                    ...appointment,
                    sno: index + 1, 
                    patient_profile_image: appointment.patient_profile_img || './images/userLogo.jpeg' 
                })).sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

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

    const loadTreatmentDetails = async () => {
        try {
            const data = await admin_payment_list();
            if (data.error) {
                console.error('Error fetching payment details:', data.error);
            } else {
                setPayment(data.admin_payment_list || []);
            }
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true); 

        try {
            const disclaimerdata = {
                appointmentId: id,
                disclaimer: newDisclaimer,
                description, 
                status: 'Done',
                treatment_fees_id,
                amount
            };

            const res = await appointment_disclaimer_update(disclaimerdata);

            if (res.error) {
                setMsg(res.error || 'An error occurred while updating the appointment.');
            } else {
                setShowToast(true);
                setNewDisclaimer(''); 
                setDescription(''); 
                
                
                setTimeout(() => {
                    setShowToast(false);
                    router.push('/../ViewAppointments');
                }, 3000); 
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            setMsg('An error occurred while updating the appointment.');
        } finally {
            setUpdating(false); 
        }
    };

    const handleChange = (event) => {
        const value = JSON.parse(event.target.value);
        const { id, amount } = value;
        setTreatmentId(id);
        setAmount(amount);
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
        },
        errorMsg: {
            color: 'red',
        },
        appointmentCard: {
            border: '1px solid #ccc',
            borderRadius: '10px',
            marginBottom: '20px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        profileImageContainer: {
            marginBottom: '20px',
        },
        profileImage: {
            height: '150px',
            width: '150px',
        },
        detailsContainer: {
            width: '100%',
        },
        detailItem: {
            margin: '5px 0',
        },
        updateForm: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        formInput: {
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
        },
        formButton: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        formButtonDisabled: {
            backgroundColor: '#aaa',
            cursor: 'not-allowed',
        },
        formSelect: {
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
        },
        toast: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1',
            display: showToast ? 'block' : 'none',
        },
        backButton: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }
    };

    return (
        <>
            <Head>
                <title>Appointment Details</title>
            </Head>
            <Header />
            <div style={styles.container}>
            <button style={styles.backButton} onClick={() => router.back()}> Back</button>
                <h1>Appointment Details</h1>
                {msg && <p style={styles.errorMsg}>{msg}</p>}
                {appointmentDetail.length > 0 ? (
                    appointmentDetail.map((appointment, index) => (
                        <div key={index} style={styles.appointmentCard}>
                            <div style={styles.profileImageContainer}>
                                <img
                                    src={appointment.patient_profile_image}
                                    alt="Profile Image"
                                    style={styles.profileImage}
                                />
                            </div>
                            <div style={styles.detailsContainer}>
                                <p style={styles.detailItem}><strong>Patient Name:</strong> {appointment.patient_name}</p>
                                <p style={styles.detailItem}><strong>Address:</strong> {appointment.address_id}</p>
                                <p style={styles.detailItem}><strong>Appointment Date:</strong> {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                                <p style={styles.detailItem}><strong>Timings:</strong> {appointment.slot_timing}</p>
                                <p style={styles.detailItem}><strong>Appointment Status:</strong> {appointment.status}</p>
                                <p style={styles.detailItem}>
                                    <strong>Prescription:</strong> {appointment.disclaimer || 'Not updated yet'}
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div style={styles.updateForm}>
                                        <textarea
                                            style={styles.formInput}
                                            placeholder="Enter diagnosis instructions"
                                            value={newDisclaimer}
                                            onChange={(e) => setNewDisclaimer(e.target.value)}
                                        />
                                        <textarea
                                            style={styles.formInput}
                                            placeholder="Enter presciption medicine"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <select
                                            style={styles.formSelect}
                                            id="treatment"
                                            name="treatment"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Treatment</option>
                                            {payment.map((treatmentname) => (
                                                <option
                                                    key={treatmentname._id}
                                                    value={JSON.stringify({
                                                        id: treatmentname._id,
                                                        amount: treatmentname.admin_amount
                                                    })}
                                                >
                                                    {treatmentname.admin_treatment_name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            style={{ ...styles.formButton, ...(updating && styles.formButtonDisabled) }}
                                            disabled={updating}
                                            type="submit"
                                        >
                                            {updating ? 'Updating...' : 'Update Details'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appointment details available.</p>
                )}
            </div>
            
            {showToast && (
                <div style={styles.toast}>
                    <p>Updated successfully.</p>
                </div>
            )}
        </>
    );
};

export default AppointmentDetails;
