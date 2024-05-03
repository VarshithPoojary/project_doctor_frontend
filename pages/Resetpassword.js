import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { resetPassword } from '../actions/forgotpasswordAction';

const ResetPasswordPage = () => {
  const [adminOtpMobileNo, setAdminOtpMobileNo] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[adminOtp,setAdminOtp]=useState('');
  

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(adminOtpMobileNo, newPassword, confirmPassword, adminOtp);
      console.log('Reset Password Response:', response); 
      if (response.message) {
        setMessage(response.message); 
          setAdminOtpMobileNo('');
        setNewPassword('');
        setConfirmPassword('');
        setAdminOtp('');
      
        Router.push('/login');
      } else {
        setError('Failed to reset password'); 
      }
    } catch (err) {
      console.error('Error resetting password:', err); 
      setError('Failed to reset password');
    }
  };
  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Reset_password' />
      </Head>

      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4" style={{ width: "500px", marginTop: "70px" }}>
                    <div className="card-header">Reset Password</div>
                    <div className="card-body">
                      <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                          <label htmlFor="new_password" className="form-label">New Password</label>
                          <input
                            className="form-control"
                            id="new_password"
                            type="password"
                            placeholder="Enter New Password"
                            name="new_password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                          <input
                            className="form-control"
                            id="confirm_password"
                            type="password"
                            placeholder="Confirm New Password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA" }}>Update</button>
                      </form>
                      <div className="mt-3 text-center">
                        <Link href="/login">Login</Link>
                      </div>
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

export default ResetPasswordPage;
