import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import { Registration } from '../actions/registrationAction';
import { country_list } from '../actions/countryAction';
import { state_list_by_country_id } from '../actions/stateAction';
import { city_list_by_state_id } from '../actions/cityAction';
import {YearOfPassing_List} from  '../actions/yearofpassingAction';
import { workExperience_list } from '../actions/workexperienceAction';
import { admin_specialist_type_list } from '../actions/caretakertypeAction';


const Registrations = () => {
    const [values,setValues]=useState('');
    const [countryList, setCountryList] = useState([]);
    const [stateDetail, setStateDetail] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [caretakertype, setCaretakertype] = useState('');
    const [caretakerList, setcaretakerList] = useState([]);
    const [caretakeraptnum, setCaretakeraptnum] = useState('');
    const [degreename, setDegreename] = useState('');
    const [uniname, setUniname] = useState('');
    const [yearofpassing, setYearofpassing] = useState('');
    const [workexperience, setWorkexp] = useState('');
    const [workList, setWorkList] = useState([]);
    const [yearOfPassingList, setYearOfPassingList] = useState([]);
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('91'); 
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [Emgname, setEmgname] = useState('');
    const [Emgphone, setEmgphone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [licenceimage, setlicenceimage] = useState(null);
    const [licenseexpirydate, setlicenseexpirydate] = useState('');
    const [description, setdescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        caretakerreferralcode:'',
        caretakertype:'',
        caretakeraptnum:'',
        degreename:'',
        uniname:'',
        yearofpassing:'',
        workexperience:'',
        email: '',
        address: '',
        country: '',
        state: '',
        area: '',
        pincode: '',
        longitude:'',
        latitude:'',
        Emgname: '',
        Emgphone: '',
        caretaker_password:'',
        profilePhoto: '', 
        licenceimage:'',
        description:'',
        licenseexpirydate:''

    });
    const [passwordValidations, setPasswordValidations] = useState({
        upperCase: false,
        lowerCase: false,
        digit: false,
        specialChar: false,
        length: false,
    });

    

    useEffect(() => {
        const loadDetail = async () => {
          try {

            const workResponse = await workExperience_list();
            console.log("Work Experience List:", workResponse);
            if (workResponse.error) {
              console.error(workResponse.error);
              return;
            }
            setWorkList(workResponse.admin_workexperience_list);

            
          const yearOfPassingResponse = await YearOfPassing_List();
            console.log("Year Of Passing List:", yearOfPassingResponse);
            if (yearOfPassingResponse.error) {
              console.error(yearOfPassingResponse.error);
              return;
            }
            setYearOfPassingList(yearOfPassingResponse.admin_yearofpassing_list);

           
                  const caretakertypeResponse = await admin_specialist_type_list();
                  console.log("caretaker type List:", caretakertypeResponse);
                  if (caretakertypeResponse.error) {
                    console.error(caretakertypeResponse.error);
                    return;
                  }
                  setcaretakerList(caretakertypeResponse.admin_specialist_type_list);
                  //alert(JSON.stringify(caretakerList))
              
          } 
          catch (error) {
            console.error(error);
          }
        };
      
        loadDetail();
      }, []);
      
      useEffect(() => {
        const loadtypeDetail = async () => {
            try { 
              const caretakertypeResponse = await admin_specialist_type_list();
              console.log("caretaker type List:", caretakertypeResponse);
              if (caretakertypeResponse.error) {
                console.error(caretakertypeResponse.error);
                return;
              }
              setcaretakerList(caretakertypeResponse.admin_specialist_type_list);
          
            } 
            catch (error) {
              console.error(error);
            }
          };
        
          loadtypeDetail();
        }, []);

     

    useEffect(() => {
        loadCountryDetail();  
    }, []);

    const loadCountryDetail = () => {
        country_list()
            .then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setCountryList(response.admin_country_list);
                }
            })
            .catch(error => console.error(error));
    };

    const handleCountryChange = (admin_country_id) => {
        state_list_by_country_id(admin_country_id)
            .then(response => {
                setCountry(admin_country_id)
                setStateDetail(response.state_list);
            })
            .catch(error => {
                console.error('Error fetching state list:', error);
            });
    };

    const handleStateChange = (admin_state_id) => {
        city_list_by_state_id(admin_state_id)
            .then(response => {
                setState(admin_state_id)
                setCityList(response.city_list);
            })
            .catch(error => {
                console.error('Error fetching city list:', error);
            });
    };
    


    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const onfileChange = (e) => {
        setlicenceimage(e.target.files[0]);
    };

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (password) => {
        const validations = {
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            digit: /[0-9]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
            length: password.length >= 8 && password.length <= 16,
        };
        setPasswordValidations(validations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

       

        const validationErrors = {};
        if (!firstName.trim()) {
            validationErrors.firstName = 'Please enter your first name.';
        }
        if (!lastName.trim()) {
            validationErrors.lastName = 'Please enter your last name.';
        }
        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid phone number.';
        }
    
        if (!dateOfBirth) {
            validationErrors.dateOfBirth = 'Please enter your date of birth.';
        }
    
        if (!gender) {
            validationErrors.gender = 'Please select your gender.';
        }
        if (!caretakertype) {
            validationErrors.caretakertype= 'Please enter type';
        }
        if (!caretakeraptnum) {
            validationErrors.caretakeraptnum = 'Please enter your apartment number';
        }
        if (!degreename) {
            validationErrors.degreename = 'Please enter your degree';
        }
        if (!uniname) {
            validationErrors.uniname = 'Please enter your university name';
        }
        if (!yearofpassing) {
            validationErrors.yearofpassing = 'Please enter your year of passing';
        }
        if (!workexperience) {
            validationErrors.workexperience = 'Please enter your years of work experience';
        }
        if (!Emgname) {
            validationErrors.Emgname = 'Please enter emergency name';
        }
        if (!Emgphone) {
            validationErrors.Emgphone = 'Please enter emergency phone numbner';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }
    
        if (!address.trim()) {
            validationErrors.address = 'Please enter your address.';
        }
    
        if (!country) {
            validationErrors.country = 'Please select your country.';
        }
    
        if (!state) {
            validationErrors.state = 'Please select your state.';
        }
    
        if (!area) {
            validationErrors.area = 'Please select your area.';
        }
    
        if (!/^\d{6}$/.test(pincode)) {
            validationErrors.pincode = 'Please enter a valid pincode.';
        }
    
       

        if (!password) {
            validationErrors.password = 'Please enter your password.';
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Please confirm your password.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match.';
        }
    
        if (!profilePhoto) {
            validationErrors.profilePhoto = 'Please upload your profile photo.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            setTimeout(() => {
                setErrors({});
            }, 10000);
            return;
           
        }

        const formData = new FormData();
        formData.append('caretaker_firstname', firstName);
        formData.append('caretaker_lastname', lastName);
       
          formData.append('caretaker_phone_number', phoneNumber);
          formData.append('caretaker_country_code', countryCode);
          formData.append('caretaker_dob', dateOfBirth);
          formData.append('caretaker_gender', gender);
          formData.append('caretaker_email', email);
          formData.append('caretaker_address', address);
          formData.append('caretaker_country_id', country);
          formData.append('caretaker_state_id', state);
          formData.append('caretaker_city_id', area);
          formData.append('caretaker_pincode', pincode);
          formData.append('caretaker_longitude', longitude);
          formData.append('caretaker_latitude', latitude);
          formData.append('caretaker_type', caretakertype);
          formData.append('caretaker_apt_number', caretakeraptnum);
          formData.append('degree_name', degreename);
          formData.append('university_name', uniname);
          formData.append('caretaker_year_of_passing', yearofpassing);
          formData.append('caretaker_work_experience',workexperience);
          formData.append('emergency_name',Emgname);
          formData.append('emergency_phone',Emgphone);
          formData.append('demo',licenceimage);
          formData.append('description',description);
          formData.append('driving_license_expiry_date',licenseexpirydate);
          formData.append('password', password);
          formData.append('demoimg', profilePhoto);

        try {
            const response = await Registration(formData);
            if (response.msg) {
                setErrorMessage(response.msg);
            } else {
                setIsSuccess(true);
                setSuccessMessage('Mail Sent To Your Email');
                setTimeout(() => {
                    localStorage.setItem('userPhone', phoneNumber);
                    Router.push(`/CaretakerLoginOTP`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setTimeout(() => {
                setErrorMessage('Error saving data. Please try again.');
            }, 1000);
        }

        setIsLoading(false);
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const toggleConfirmPasswordVisibility = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    return (
        <>
            <Head>
                <title>caretaker Registration</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title"  content="caretaker Registration Form" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>

            <div className="container mt-4" style={{width:'1000px'}}>
                <div className="cardoi" style={{ width:'900px',backgroundColor:'white',alignContent:'center', boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }}>
                    <h4 className="mb-3 text-center">Registration Form</h4>
                    <p className="mb-3 text-center">Please fill in your details to register.</p>

                    <div className="card-body" style={{ padding: '20px' }}>
                        <form onSubmit={handleSubmit}>
                       
                            <div className="form-group">
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="FirstName">First Name*</label>
                                        <input className="form-control" id="FirstName" type="text" placeholder="Enter your first name" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                                        {errors.firstName && <div className="error-message" style={{color:'red'}}>{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="LastName">Last Name*</label>
                                        <input className="form-control" id="LastName" type="text" placeholder="Enter your last name" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}/>
                                        {errors.lastName && <div className="error-message" style={{color:'red'}}>{errors.lastName}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="CountryCode">Country Code*</label>
                                        <select className="form-control" id="CountryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                            <option value="91+">91+</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Phone">Phone Number*</label>
                                        <input className="form-control" id="Phone" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
                                        {errors.phoneNumber && <div className="error-message" style={{color:'red'}}>{errors.phoneNumber}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Dob">Date Of Birth*</label>
                                        <input className="form-control" id="Dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                        {errors.dateOfBirth && <div className="error-message" style={{color:'red'}}>{errors.dateOfBirth}</div>}
                                    </div>
                                
                        
                                    <div className="col-md-6">
                                        <label className="small mb-1">Gender*</label><br />
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="female" name="gender"value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="other" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="other">Other</label>
                                        </div>
                                        {errors.gender && <div className="error-message" style={{color:'red'}}>{errors.gender}</div>}
                                    </div>
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="Email">Email*</label>
                                    <input className="form-control" id="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className="error-message" style={{color:'red'}}>{errors.email}</div>}
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="Address">Address*</label>
                                    <textarea className="form-control" id="Address" rows="3" placeholder="Enter your address"value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                    {errors.address && <div className="error-message" style={{color:'red'}}>{errors.address}</div>}

                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                    <label htmlFor="caretakertype" className="small mb-1">Caretaker Type<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control' id="caretakertype"
                              onChange={(e) => setCaretakertype(e.target.value)}>
                               <option value="">Select caretaker type</option>
                               { caretakerList.map(caretakertype => (
                                  <option key={caretakertype.admin_specialist_type_name} value={caretakertype.admin_specialist_type_name}>{caretakertype.specialist_type_name}</option>
                                ))}
                            </select>
                            {errors.caretakertype && <div className="error-message" style={{color:'red'}}>{errors.caretakertype}</div>}

                                    
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="caretakeraptnum">Apt Number*</label>
                                        <input className="form-control" id="caretakeraptnum" type="text" placeholder="Enter your apt number" value={caretakeraptnum}
                                    onChange={(e) => setCaretakeraptnum(e.target.value)}/>
                                        {errors.caretakeraptnum && <div className="error-message" style={{color:'red'}}>{errors.caretakeraptnum}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="degreename">Degree Name*</label>
                                        <input className="form-control" id="degreename" type="text" placeholder="Enter your Degree" value={degreename}
                                    onChange={(e) => setDegreename(e.target.value)} />
                                        {errors.degreename && <div className="error-message" style={{color:'red'}}>{errors.degreename}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="uniname">University Name*</label>
                                        <input className="form-control" id="uniname" type="text" placeholder="Enter your university name" value={uniname}
                                    onChange={(e) => setUniname(e.target.value)}/>
                                        {errors.uniname && <div className="error-message" style={{color:'red'}}>{errors.uniname}</div>}
                                    </div>
                                </div>
                               <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Emgname">Emergency name*</label>
                                        <input className="form-control" id="Emgname" type="text" placeholder="Enter your emergency name"  value={Emgname} onChange={(e) => setEmgname(e.target.value)} />
                                        {errors.Emgname && <div className="error-message" style={{color:'red'}}>{errors.Emgname}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Emgphone">Emergency phone number*</label>
                                        <input className="form-control" id="Emgphone" type="text" placeholder="Enter your emergency phone number" value={Emgphone}
                                    onChange={(e) => setEmgphone(e.target.value)}/>
                                        {errors.Emgphone && <div className="error-message" style={{color:'red'}}>{errors.Emgphone}</div>}
                                    </div>
                                </div>
                                
                         <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label htmlFor="workExperience" className="small mb-1">work Experience<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="workExperience"
                              onChange={(e) => setWorkexp(e.target.value)}>
                               <option value="">Select Work Experience</option>
                               { workList.map(workexperience => (
                                  <option key={workexperience.admin_work_experience} value={workexperience.admin_work_experience}>{workexperience.admin_work_experience}</option>
                                ))}
                            </select>
                            {errors.workexperience && <div className="error-message" style={{color:'red'}}>{errors.workexperience}</div>}

                            </div>
                        
                          <div className="col-md-6">
                          <label htmlFor="YearOfPassing" className="small mb-1">Year Of Passing<span style={{ color: 'red' }}>*</span>:</label>
                            <select
                              className='form-control'
                              id="YearOfPassing"
                              onChange={(e) => setYearofpassing(e.target.value)}>
                               <option value="">Select Year Of Passing</option>
                               { yearOfPassingList.map(yearofpassing => (
                                  <option key={yearofpassing.admin_year_of_passing} value={yearofpassing.admin_year_of_passing}>{yearofpassing.admin_year_of_passing}</option>
                                ))}
                            </select>
                            {errors.yearofpassing && <div className="error-message" style={{color:'red'}}>{errors.yearofpassing}</div>}

                            </div>
                        </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="country">Country</label>
                            <select className="form-control" id="country" onChange={(e) => handleCountryChange(e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map(country => (
                                    <option key={country._id} value={country._id}>{country.admin_country_name}</option>
                                ))}
                            </select>
                            {errors.country && <div className="error-message" style={{color:'red'}}>{errors.country}</div>}
                                    </div>
                                    <div className="col-md-4">
                                    <label className="small mb-1" htmlFor="state">State</label>
                            <select className="form-control" id="state" onChange={(e) => handleStateChange(e.target.value)}>
                                <option value="">Select State</option>
                                {stateDetail.map(state => (
                                    <option key={state._id} value={state._id}>{state.admin_state_name}</option>
                                ))}
                            </select>
                            {errors.state && <div className="error-message" style={{color:'red'}}>{errors.state}</div>}

                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="city">Area</label>
                                        <select className="form-control" id="city" onChange={(e) => setArea(e.target.value)}>
                                            <option value="">Select City</option>
                                            {cityList.map(city => (
                                                <option key={city._id} value={city._id}>{city.admin_city_name}</option>
                                            ))}
                                        </select>
                                        {errors.area && <div className="error-message" style={{color:'red'}}>{errors.area}</div>}

                                    </div>

                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Pincode">Pincode*</label>
                                        <input className="form-control" id="Pincode" type="text" placeholder="Enter your pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}  />
                                        {errors.pincode && <div className="error-message" style={{color:'red'}}>{errors.pincode}</div>}
                                    </div>
                                 
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="caretakerlongitude">Longitude*</label>
                                        <input className="form-control" id="longitude" type="text" placeholder="Enter the longitude" value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)} />
                                        {errors.longitude && <div className="error-message" style={{color:'red'}}>{errors.longitude}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="caretakerlatitude">Latitude*</label>
                                        <input className="form-control" id="latitude" type="text" placeholder="Enter the latitude" value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}/>
                                        {errors.latitude && <div className="error-message" style={{color:'red'}}>{errors.latitude}</div>}
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="licenceimage">driving licence image</label>
                                        <input className="form-control" id="licenceimage" type="file" onChange={onfileChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="licenseexpirydate">Driving license expiry date</label>
                                        <input className="form-control" id="licenseexpirydate" type="date" value={licenseexpirydate} onChange={(e) => setlicenseexpirydate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" rows="3" placeholder="Enter description about you" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                                    
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                    <label htmlFor="password" className="small mb-1">Password<span>*</span>:</label>
                                    <input
                                        type={values.showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                    {errors.password && <div className="error-message" style={{color:'red'}}>{errors.password}</div>}
                                    {password && (
                                        <div>
                                            <div style={{ color: passwordValidations.upperCase ? 'green' : 'red' }}>
                                                {passwordValidations.upperCase ? 'Contains uppercase letter ✓' : 'Requires at least one uppercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.lowerCase ? 'green' : 'red' }}>
                                                {passwordValidations.lowerCase ? 'Contains lowercase letter ✓' : 'Requires at least one lowercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.digit ? 'green' : 'red' }}>
                                                {passwordValidations.digit ? 'Contains digit ✓' : 'Requires at least one digit'}
                                            </div>
                                            <div style={{ color: passwordValidations.specialChar ? 'green' : 'red' }}>
                                                {passwordValidations.specialChar ? 'Contains special character ✓' : 'Requires at least one special character'}
                                            </div>
                                            <div style={{ color: passwordValidations.length ? 'green' : 'red' }}>
                                                {passwordValidations.length ? 'Length between 8 and 16 characters ✓' : 'Requires length between 8 and 16 characters'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                    <div className="col-md-6">
                                    <label htmlFor="confirmPassword" className="small mb-1">Confirm Password<span>*</span>:</label>
                                <input
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                  <span
                                    className={`fas ${values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></span>
                                {errors.confirmPassword && <div className="error-message" style={{color:'red'}}>{errors.confirmPassword}</div>}

                                </div>
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="ProfilePhoto">Profile Photo*</label>
                                    <input className="form-control" id="ProfilePhoto" type="file" onChange={onFileChange} />
                                    {errors.profilePhoto && <div className="error-message"style={{color:'red'}}>{errors.profilePhoto}</div>}
                                </div>
                                </div>
    
                                <div className="form-group">
                                 <div className="row justify-content-center">
                                 <div className="col text-center">
                                    <button className='registration-button' type="submit" disabled={isLoading}>
                                         {isLoading ? 'Loading...' : 'Register'}
                                    </button>
                                    </div>
                                         {isSuccess && <div className="success-message">{successMessage}</div>}
                                         {errorMessage && <div className="error-message">{errorMessage}</div>}
                                  
                                 </div>
                                 </div>
                        </form>
                        <div className="text-center mt-3 login-link">
                            Already a member?{' '}
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registrations;
