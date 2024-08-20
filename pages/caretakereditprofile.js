
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiCamera } from 'react-icons/fi';
import Router from 'next/router';
import Head from 'next/head';
import Header from './Header';
import { country_list } from '../actions/countryAction';
import { state_list_by_country_id, state_list } from '../actions/stateAction';
import { city_list_by_state_id, city_list, CityListById } from '../actions/cityAction';
import { caretaker_list_by_id, caretaker_update } from '../actions/registrationAction';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import LoadingBar from 'react-top-loading-bar';




const Caretakereditprofile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [loadingbar, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const [values, setValues] = useState({
    caretaker_firstname: '',
    caretaker_lastname: '',
    caretaker_phone_number: '',
    caretaker_country_code: '',
    caretaker_dob: '',
    caretaker_gender: '',
    caretaker_email: '',
    caretaker_address: '',
    caretaker_country_id: '',
    caretaker_state_id: '',
    caretaker_city_id: '',
    caretaker_pincode: '',
    password: '',
    caretaker_profile_image: '',
    caretaker_created_date: '',
    caretaker_apt_number: '',
    emergency_phone: '',
    degree_name: '',
    university_name: '',
    countryList: [],
    stateList: [],
    areaList: [],
    error: '',
    loading: false,
  });



  const {
    countryList,
    stateList,
    areaList,
    caretaker_firstname,
    caretaker_lastname,
    caretaker_phone_number,
    caretaker_country_code,
    caretaker_dob,
    caretaker_gender,
    caretaker_email,
    caretaker_address,
    caretaker_country_id,
    caretaker_state_id,
    caretaker_city_id,
    caretaker_pincode,
    password,
    caretaker_profile_image,
    caretaker_created_date,
    caretaker_apt_number,
    emergency_phone,
    degree_name,
    university_name,
    error,
    loading,
  } = values;

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    if (!user_id) {
      Router.push('/login');
    } else {
      setProgress(30);
      loadUserDetails(user_id);
    }
  }, []);

  const loadUserDetails = async (user_id) => {
    try {
      const countrydata = await country_list();
      if (countrydata.error) {
        console.log(countrydata.error);
      } else {
        const stateData = await state_list();
        if (stateData.error) {
          console.log(stateData.error);
        } else {
          const cityData = await city_list();
          if (cityData.error) {
            console.log(cityData.error);
          } else {
            const data = await caretaker_list_by_id(user_id);
            if (data.error) {
              console.log(data.error);
              setValues({ ...values, error: data.error, loading: false });
            } else {
              const doctorData = data.caretaker_list[0];
              setValues({
                ...values,
                caretaker_firstname: doctorData.caretaker_firstname,
                caretaker_lastname: doctorData.caretaker_lastname,
                caretaker_phone_number: doctorData.caretaker_phone_number,
                caretaker_email: doctorData.caretaker_email,
                caretaker_profile_image: doctorData.caretaker_profile_image || defaultProfileImage,
                caretaker_referralcode: doctorData.caretaker_referralcode,
                caretaker_country_code: doctorData.caretaker_country_code,
                caretaker_dob: doctorData.caretaker_dob,
                caretaker_type: doctorData.caretaker_type,
                caretaker_gender: doctorData.caretaker_gender,
                caretaker_address: doctorData.caretaker_address,
                caretaker_country_id: doctorData.caretaker_country_id,
                caretaker_state_id: doctorData.caretaker_state_id,
                caretaker_city_id: doctorData.caretaker_city_id,
                caretaker_pincode: doctorData.caretaker_pincode,
                caretaker_apt_number: doctorData.caretaker_apt_number,
                emergency_phone: doctorData.emergency_phone,
                degree_name: doctorData.degree_name,
                university_name: doctorData.university_name,
                caretaker_year_of_passing: doctorData.caretaker_year_of_passing,
                caretaker_work_experience: doctorData.caretaker_work_experience,
                description: doctorData.description,
                driving_license_expiry_date: doctorData.driving_license_expiry_date,
                password: doctorData.password,
                countryList: countrydata.admin_country_list,
                stateList: stateData.state_list,
                areaList: cityData.city_list,
                loading: false,
              });
              setProgress(100);
              setLoading(false); 
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setValues({ ...values, error: 'Error: Network request failed', loading: false });
      setProgress(100); 
      setLoading(false); 


    }
  };
  

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues({ ...values, [name]: value });

    if (name === 'caretaker_country_id') {
      state_list_by_country_id(value).then((data1) => {
        if (data1.error) {
          console.log(data1.error);
        } else {
          setValues({ ...values, stateList: data1.state_list,caretaker_country_id: value });
        }
      });
    }

    if (name === 'caretaker_state_id') {
      city_list_by_state_id(value).then((data2) => {
        if (data2.error) {
          console.log(data2.error);
        } else {
          setValues({ ...values, areaList: data2.city_list,caretaker_state_id: value });
        }
      });
    }

    if (name === 'caretaker_city_id') {
      CityListById(value).then((data3) => {
        if (data3.error) {
          console.log(data3.error);
        } else {
          setValues({ ...values, caretaker_city_id: value });
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const doctor_id = localStorage.getItem('id');
    const countryId = document.getElementById('country').value;
    const stateId = document.getElementById('caretaker_state_id').value;
    const areaId = document.getElementById('caretaker_city_id').value;
    const formData = new FormData();

    formData.append('doctor_id', doctor_id);
    formData.append('caretaker_firstname', caretaker_firstname);
    formData.append('caretaker_lastname', caretaker_lastname);
    formData.append('demoimg', profileImage);
    formData.append('caretaker_phone_number', caretaker_phone_number);
    formData.append('caretaker_country_code', caretaker_country_code);
    formData.append('caretaker_dob', caretaker_dob);
    formData.append('caretaker_gender', caretaker_gender);
    formData.append('caretaker_email', caretaker_email);
    formData.append('caretaker_address', caretaker_address);
    formData.append('caretaker_country_id', countryId);
    formData.append('caretaker_state_id', stateId);
    formData.append('caretaker_city_id', areaId);
    formData.append('caretaker_pincode', caretaker_pincode);
    formData.append('caretaker_apt_number', caretaker_apt_number);
    formData.append('emergency_phone', emergency_phone);
    formData.append('degree_name', degree_name);
    formData.append('university_name', university_name);
   if(newPassword)
   {
      formData.append('password', newPassword);
   }

    try {
      const response = await caretaker_update(formData);

      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been successfully updated!',
        }).then(() => {
          Router.push('/caretakerprofile');
        });
       
      // Router.push(`/caretakerprofile`);
      }
    } catch (error) {
      console.error('Error:', error);
      setValues({ ...values, error: 'Error updating profile', loading: false });
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]); 
    }
  };
  const Cancel = () => {
    Router.push('/caretakerprofile');
  };
  
  return (
   
      <div>
        <Head>
          <title>Edit Doctor Profile</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/images/title_logo.png" />
        </Head>
        <Header />
        <LoadingBar
        color="#0000FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

        <div className="container mt-5" style={{ width: '1000px', marginTop: '10px' }}>
          <div className="row justify-content-center" style={{ width: '1000px', marginTop: '10px' }}>
            <div className="col-lg-8" style={{ width: '1000px', marginTop: '10px' }}>
              <div className="card" style={{ width: '1000px', marginTop: '10px' }}>
                <div className="card-header" style={{ background: '#4099ff', textAlign: 'center' }}>
                  <h4 className="text-white">Profile Edit</h4>
                </div>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                      <div style={{ position: 'relative' }}>
                        <img
                          src={profileImage ? URL.createObjectURL(profileImage) : caretaker_profile_image}
                          alt="Profile"
                          className="img-fluid rounded-circle"
                          style={{ width: '150px', height: '150px' }}
                        />
                        <label
                          htmlFor="file-upload"
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 'calc(50% - 75px)',
                            background: '#4099ff',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <FiCamera />
                        </label>
                        <input
                          type="file"
                          id="file-upload"
                          onChange={onFileChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_firstname">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_firstname"
                            value={caretaker_firstname}
                            onChange={handleChange('caretaker_firstname')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_lastname">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_lastname"
                            value={caretaker_lastname}
                            onChange={handleChange('caretaker_lastname')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_phone_number">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_phone_number"
                            value={caretaker_phone_number}
                            onChange={handleChange('caretaker_phone_number')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_country_code">Country Code</label>
                          <select className="form-control" id="CountryCode" >
                                <option value="India">India</option>
                              </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="Dob">Date of Birth</label>
                          <input className="form-control" id="Dob" type="date" value={caretaker_dob} onChange={handleChange('caretaker_dob')} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_gender">Gender</label>
                          <select
                            className="form-control"
                            id="caretaker_gender"
                            value={caretaker_gender}
                            onChange={handleChange('caretaker_gender')}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="caretaker_email"
                            value={caretaker_email}
                            onChange={handleChange('caretaker_email')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_address">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_address"
                            value={caretaker_address}
                            onChange={handleChange('caretaker_address')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="country">Country</label>
                          <select
                            className="form-control"
                            id="country"
                            value={caretaker_country_id}
                            onChange={handleChange('caretaker_country_id')}
                          >
                            <option value="">Select Country</option>
                            {countryList.map((country) => (
                              <option key={country._id} value={country._id}>
                                {country.admin_country_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_state_id">State</label>
                          <select
                            className="form-control"
                            id="caretaker_state_id"
                            value={caretaker_state_id}
                            onChange={handleChange('caretaker_state_id')}
                          >
                            <option value="">Select State</option>
                            {stateList.map((state) => (
                              <option key={state._id} value={state._id}>
                                {state.admin_state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_city_id">City</label>
                          <select
                            className="form-control"
                            id="caretaker_city_id"
                            value={caretaker_city_id}
                            onChange={handleChange('caretaker_city_id')}
                          >
                            <option value="">Select City</option>
                            {areaList.map((city) => (
                              <option key={city._id} value={city._id}>
                                {city.admin_city_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_pincode">Pincode</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_pincode"
                            value={caretaker_pincode}
                            onChange={handleChange('caretaker_pincode')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="caretaker_apt_number">Apt Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="caretaker_apt_number"
                            value={caretaker_apt_number}
                            onChange={handleChange('caretaker_apt_number')}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="emergency_phone">Emergency Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            id="emergency_phone"
                            value={emergency_phone}
                            onChange={handleChange('emergency_phone')}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <div style={{ position: 'relative' }}>
        <input
          type={showNewPassword ? "text" : "password"}
          className="form-control"
          id="password"
          value={newPassword}  
          onChange={(e) => setNewPassword(e.target.value)}  
        />
        <span
          onClick={() => setShowNewPassword(!showNewPassword)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
        >
          {showNewPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <div style={{ position: 'relative' }}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="form-control"
          id="confirmPassword"
          
          onChange={(e) => setConfirmPassword(e.target.value)}  
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
        >
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>
    </div>
  </div>
</div>
{passwordError && <div className="alert alert-danger">{passwordError}</div>}

                    {error && <div className="alert alert-danger">{error}</div>}
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary m-2">
                      Save
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={Cancel} className="btn btn-secondary m-2">
                      Cancel
                    </button>
                  </div>
                </form>
                {loading && <div className="text-center">Loading...</div>}
              </div>
                   
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  
};

export default Caretakereditprofile;

