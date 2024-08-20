
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import {OtpByEmail,caretaker_registration_update} from '../actions/loginAction';
import { caretaker_resendOTP } from '../actions/forgotpasswordAction';

const OTPPage = () => {
  const [otpDigits, setOtpDigits] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOtpChange = (e) => {
    setOtpDigits(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
  
    const userPhone = localStorage.getItem('userPhone');
    //alert(JSON.stringify(userPhone))
    try {
      const response = await OtpByEmail(userPhone);
      const user = response;
  
      if (user.caretaker_otp===otpDigits) { 
        setMessage('OTP verified successfully');
        setError('');
  
        const registration_data = {
          caretaker_phone_number:userPhone,
          caretaker_register_status:true,
        };
  
      try {
          const updateResponse = await caretaker_registration_update(registration_data); 
          if (updateResponse.error) {
            setError(updateResponse);
            // setValues({ ...values, error: updateResponse.error });
          } else {
            localStorage.removeItem('userPhone');
            Router.push('/login');
          }
        } catch (error) {
          console.error('Error updating registration status:', error);
          setError('Error updating registration status');
          // setValues({ ...values, error: 'Error updating registration status', loading: false });
        }
      } 
      else {
        setMessage('');
        setError('Wrong OTP');
        setTimeout(() => {
          setError('');
        }, 1000);
      }
    }
     catch (err) {
      console.error('Failed to verify OTP:', err);
      setMessage('');
      setError('Failed to verify OTP');
    }
  };


 const handleResendOTP = async (e) => {
    e.preventDefault();
    const userPhone = localStorage.getItem('userPhone');
    try {
      const response = await caretaker_resendOTP(userPhone);
      if(response.error)
        {
          setError(response.error);
          setTimeout(() => {
            setError('');
          }, 1000);
          
        }
        else{
          setMessage("OTP sent to you mail")
          setTimeout(() => {
            setMessage("")
          }, 1000);
          
        }
    } catch (err) {
      setMessage('');
      setError('Failed to generate OTP');
    }
  };



  

  return (
   
<>
      <Head>
        <title>OTP Verification</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="OTP Verification" />
      </Head>

      <div style={styles.container}>
        <div style={styles.screen}>
          <div style={styles.screenContent}>
            <b style={styles.otpText}>OTP Verification</b>
            <form style={styles.loginForm} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="caretaker_otp">
                  Enter the OTP sent to your email:
                </label>
                <input
                  style={styles.formInput}
                  id="caretaker_otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otpDigits}
                  onChange={handleOtpChange}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                <span>Submit</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </form>
            {message && <div style={styles.alertSuccess}>{message}</div>}
            {error && <div style={styles.alertDanger}>{error}</div>}
            <div style={styles.linkContainer}>
              <Link href="/CaretakerRegistration">
                <a style={styles.link}>Back</a>
              </Link>
              <span style={styles.linkSeparator}>&nbsp;|&nbsp;</span>
              <div style={styles.link} onClick={handleResendOTP}>
                Resend OTP
              </div>
            </div>
          </div>
          <div style={styles.screenBackground}>
            <span style={{ ...styles.shape, ...styles.shape1 }}></span>
            <span style={{ ...styles.shape, ...styles.shape2 }}></span>
            <span style={{ ...styles.shape, ...styles.shape3 }}></span>
            <span style={{ ...styles.shape, ...styles.shape4 }}></span>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)',
    padding: '20px',
  },
  screen: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    borderRadius: '10px',
    padding: '40px 30px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '0 20px',
  },
  screenContent: {
    position: 'relative',
    zIndex: 2,
  },
  otpText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3e34d0',
    marginBottom: '30px', 
  },
  loginForm: {
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '25px', 
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '10px',
    color: '#333',
  },
  formInput: {
    width: '100%',
    padding: '12px', 
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  formInputFocus: {
    borderColor: '#3e34d0',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    background: '#3e34d0',
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  submitButtonHover: {
    backgroundColor: '#2a2499',
  },
  alertSuccess: {
    color: 'green',
    marginTop: '20px',
  },
  alertDanger: {
    color: 'red',
    marginTop: '20px',
  },
  linkContainer: {
    marginTop: '30px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  link: {
    color: '#3e34d0',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  linkSeparator: {
    color: '#3e34d0',
  },
  screenBackground: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
  },
  shape: {
    position: 'absolute',
    borderRadius: '50%',
  },
  shape1: {
    width: '200px',
    height: '200px',
    background: '#3e34d0',
    top: '-50px',
    right: '-50px',
    opacity: '0.4',
  },
  shape2: {
    width: '150px',
    height: '150px',
    background: '#2a2499',
    top: '100px',
    right: '-75px',
    opacity: '0.3',
  },
  shape3: {
    width: '100px',
    height: '100px',
    background: '#3e34d0',
    bottom: '50px',
    left: '-25px',
    opacity: '0.2',
  },
  shape4: {
    width: '80px',
    height: '80px',
    background: '#2a2499',
    bottom: '-20px',
    left: '50px',
    opacity: '0.1',
  },
};


export default OTPPage;
