
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { caretaker_forgot_Password_OTP, caretaker_resetPassword } from '../actions/forgotpasswordAction';

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your registered Email ID');
      return;
    }

    try {
      const response = await caretaker_forgot_Password_OTP(email);
      if (response.error) {
        setError(response.error);
      } else {
        setMessage('An OTP has been sent to your registered Email ID.');
        setIsOtpSent(true);
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      
    }
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
      );
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
    }

    try {
      const response = await caretaker_resetPassword(email,newPassword);
      if (response.error) {
        setError(response.error);
      } else {
        setMessage('Password reset successful! Redirecting to login page...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setError('An error occurred. Please try again.');
    }
  };
 
  useEffect(() => {
    let timer;
    if (message === 'Password reset successful! Redirecting to login page...') {
      timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
   return () => clearTimeout(timer);
  }, [message, router]);

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Forgot Password" />
      </Head>

      <div style={styles.container}>
        <div style={styles.screen}>
          <div style={styles.screenContent}>
            <b style={styles.pageTitle}>Forgot Password</b>

            {!isOtpSent && !message && (
              <form style={styles.form} onSubmit={handlePhoneSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="phone">
                    Enter your registered Email Id to reset your password:
                  </label>
                  <input
                    style={styles.formInput}
                    id="email"
                    type="text"
                    placeholder="Enter your Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  <span>Send OTP</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
                {error && <div style={styles.alertDanger}>{error}</div>}
              </form>
            )}

            {isOtpSent && message && (
              <form style={styles.form} onSubmit={handleResetPassword}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="otp">
                    Enter OTP sent to your Email:
                  </label>
                  <input
                    style={styles.formInput}
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="newPassword">
                    Enter new password:
                  </label>
                  <input
                    style={styles.formInput}
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel} htmlFor="confirmPassword">
                    Confirm new password:
                  </label>
                  <input
                    style={styles.formInput}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  <span>Reset Password</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
                {error && <div style={styles.alertDanger}>{error}</div>}
                {message && <div style={styles.alertSuccess}>{message}</div>}
              </form>
            )}

            <div style={styles.linkContainer}>
              <Link href="/login">
                <a style={styles.link}>Back to Login</a>
              </Link>
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
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3e34d0',
    marginBottom: '30px',
  },
  form: {
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
  },
  link: {
    color: '#3e34d0',
    cursor: 'pointer',
    textDecoration: 'underline',
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

export default ForgotPasswordPage;

