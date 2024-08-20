
import Link from 'next/link';
import React, { useState } from 'react';
import Router from 'next/router';
import { caretakerlogin } from '../actions/loginAction';

const LoginForm = () => {
  const [values, setValues] = useState({
    phone_number: '',
    password: '',
    error: '',
    loading: false,
    showPassword: false,
  });

  const { phone_number, password, error, loading, showPassword } = values;

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone_number || !password) {
      setValues({ ...values, error: 'Please enter all fields' });
      setTimeout(() => {
        setValues({ ...values, error: '', loading: false });
      }, 1000);
      return;
    }
    setValues({ ...values, loading: true, error: '' });

    try {
      const loginData = { phone_number, password };
      const response = await caretakerlogin(loginData);

      if (response.error) {
        setValues({ ...values, error: response.msg, loading: false });
        setTimeout(() => {
          setValues({ ...values, error: '', loading: false });
        }, 2000);
      } else {
        localStorage.setItem('id', response.userId);
        setIsSuccess(true);
        setSuccessMessage('Login successful!');
        setValues({ ...values, phone_number: '', password: '', loading: false });
        Router.push('/caretakerprofile');
      }
    } catch (error) {
      console.error('Error in login:', error);
      setValues({ ...values, error: 'An error occurred during login', loading: false });
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div style={styles.doctorContainer}>
      <div style={styles.screen}>
        <div style={styles.screenContent}>
          <b style={styles.loginText}>LOGIN</b>
          <form style={styles.loginForm} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="phone_number">Enter Phone Number :</label>
              <input
                style={styles.formInput}
                id="phone_number"
                type="text"
                placeholder="Enter Phone Number"
                name="phone_number"
                value={phone_number}
                onChange={handleChange('phone_number')}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel} htmlFor="password">Enter Password :</label>
              <div style={styles.passwordContainer}>
                <input
                  style={styles.formInput}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={handleChange('password')}
                />
                <span
                  style={styles.passwordToggle}
                  onClick={togglePasswordVisibility}
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                ></span>
              </div>
              <div style={styles.forgotPassword}>
                <Link href="/ForgotPassword">
                  <a style={styles.forgotPasswordLink}>Forgot Password?</a>
                </Link>
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>
              <span>Login</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div style={styles.loginLink}>
              Don't have an account?{' '}
              <Link href="/CaretakerRegistration">
                <a style={{ color: '#3e34d0' }}>Register Here</a>
              </Link>
            </div>
            {error && <div style={styles.alert}>{error}</div>}
            {isSuccess && <div style={styles.successMessage}>{successMessage}</div>}
          </form>
        </div>
        <div style={styles.screenBackground}>
          <span style={{ ...styles.shape, ...styles.shape1 }}></span>
          <span style={{ ...styles.shape, ...styles.shape2 }}></span>
          <span style={{ ...styles.shape, ...styles.shape3 }}></span>
          <span style={{ ...styles.shape, ...styles.shape4 }}></span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  doctorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8, #d9e2ec)',
    padding: '20px', 
    boxSizing: 'border-box',
  },
  screen: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    borderRadius: '10px',
    padding: '50px 40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    minHeight: '500px',
    boxSizing: 'border-box',
  },
  screenContent: {
    position: 'relative',
  },
  loginText: {
    display: 'block',
    fontSize: '24px',
    textAlign: 'center',
    color: '#3e34d0',
    marginBottom: '20px',
  },
  loginForm: {
    marginTop: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#888',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    background: '#3e34d0',
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
  },
  alert: {
    color: 'red',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
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
  forgotPassword: {
    marginTop: '10px',
    textAlign: 'right',
  },
  forgotPasswordLink: {
    color: '#3e34d0',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};


const mediaQueries = {
  smallScreen: '@media only screen and (max-width: 768px)',
};


styles.screen = {
  ...styles.screen,
  [mediaQueries.smallScreen]: {
    padding: '30px 20px',
    minHeight: '400px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
};

styles.formInput = {
  ...styles.formInput,
  [mediaQueries.smallScreen]: {
    fontSize: '14px',
    padding: '8px',
  },
};

styles.submitButton = {
  ...styles.submitButton,
  [mediaQueries.smallScreen]: {
    padding: '8px',
    fontSize: '14px',
  },
};

export default LoginForm;

