import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Adminsignin } from '../actions/loginAction';


const AdminSignin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        showPassword: false, 
    });

    const { email, password, error, loading, showPassword } = values;
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setValues({ ...values, error: 'Please enter all fields' });
            setTimeout(() => {
                setValues({ ...values, error: '', loading: false });
            }, 1000);
            return;
        }
        setValues({ ...values, loading: true, error: '' });

        try {
            const loginData = { email, password };
            const response = await Adminsignin(loginData); 
            if (response.error) {
                setValues({ ...values, error: 'Incorrect email or password', loading: false });
                setTimeout(() => {
                    setValues({ ...values, error: '', loading: false });
                }, 1000);
            } else {
                localStorage.setItem('id', response.userId);
                setIsSuccess(true);
                setValues({ ...values, email: '', password: '', loading: false });
                Router.push('/dashboard'); 
            }
        } catch (error) {
            console.error('Signin Error:', error);
            setValues({ ...values, error: 'An error occurred during login', loading: false });
        }
    };

    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    };

    return (
        <div className="login-form">
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Login' />
                <link rel="icon" href="/images/title_logo.png" />

            </Head>
           

            <div className="login_wrapper">
                {/* <div className="logo">
                    <img src="/icons/img1.png" alt="" />
                </div> */}
              
                <div className="text-center mt-4 name">Login</div>
                
                <form onSubmit={handleSubmit} className="p-3 mt-3">
                    
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-envelope"></span>
                        <input
                            className='login_input'
                            id='login_email'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange('email')}
                        />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input
                             className='login_input'
                            id='login_password'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange('password')}
                        />
                       
                        <span
                            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                        ></span>
                    </div>
                    <div className="text-center fs-6 mt-2">
                    <Link href="/Forgotpassword">
                        <a>Forgot Password</a>
                    </Link>
                    </div>
                    <button type="submit" className="btn mt-3">
                        Login
                    </button>
                </form>   
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {/* {loading ? (<div class="alert alert-success margin-top-10">Login Successfull</div>) : null} */}
                {isSuccess && <div className="success-message">{successMessage}</div>}
                {/* {loading && <div className="alert alert-info">Loading...</div>} */}
                <div className="text-center fs-6 login-link">
                    Don't have an account?{' '}
                    <Link href="/Registration">
                        <a>create an account</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminSignin;
