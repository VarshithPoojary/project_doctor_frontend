import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { verifyOTP } from '../actions/forgotpasswordAction';

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
    try {
      const response = await verifyOTP(otpDigits); 
      setMessage(response.message);
      setError('');
      if (response.message === 'OTP verified successfully') {
        Router.push('/Resetpassword');
      }
    } catch (err) {
      setMessage('');
      setError('Failed to verify OTP');
    }
  };

  return (
    <>
      <Head>
        <title>OTP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Admin_Profile" />
      </Head>

      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="my-card">
                    <div className="my-card-header">One Time Password (OTP)</div>
                    <div className="my-card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="admin_otp" className="form-label">Enter OTP sent to your Mobile</label>
                          <div className="otp-container">
                            <input
                              className="otp-input"
                              type="text"
                              value={otpDigits}
                              onChange={handleOtpChange}
                            />
                          </div>
                        </div>
                        <div className="d-grid">
                          <button className="my-btn-primary" type="button" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="mt-3 text-center">
                          <Link href="/ResendOTP">Resend OTP</Link>
                        </div>
                      </form>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
