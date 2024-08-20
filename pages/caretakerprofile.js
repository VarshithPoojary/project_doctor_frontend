
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Topbar from './topbar';
import Header from './Header';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';
import Head from 'next/head';
import Router from 'next/router';
import { caretaker_list_by_id, caretaker_delete } from '../actions/registrationAction';
import { CityListById} from '../actions/cityAction';
import { CountryListById} from '../actions/countryAction';
import { StateListById} from '../actions/stateAction';
import LoadingBar from 'react-top-loading-bar'; 

const DoctorProfile = () => {
  const defaultProfileImage = '/images/userLogo.png';
  const [values, setValues] = useState({
    caretaker_list: [],
    caretaker_profile_image: defaultProfileImage,
    error: '',
    loading: true,
    caretaker_city_name: '',
    caretaker_country_name: '',
    caretaker_state_name: '',
  });
  const [loading, setLoading] = useState(true); 
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    setProgress(30);
    loadCaretakerDetails();
  }, []);

  const loadCaretakerDetails = async () => {
    try {
      const doctor_id = localStorage.getItem('id');
      if (!doctor_id) {
        Router.push('/login');
      } else {
        const data = await caretaker_list_by_id(doctor_id);
        if (data.error) {
          throw new Error(data.error);
        }
        const doctorData = data.caretaker_list[0];
        const cityData = await CityListById(doctorData.caretaker_city_id);
        const cityName = cityData.city_list && cityData.city_list.length > 0 ? cityData.city_list[0].admin_city_name : '';
       
        const countryData = await  CountryListById(doctorData.caretaker_country_id);
        const countryName = countryData.admin_country_list && countryData.admin_country_list.length > 0 ? countryData.admin_country_list[0].admin_country_name : '';

        const stateData = await  StateListById(doctorData.caretaker_state_id);
        const stateName = stateData.state_list && stateData.state_list.length > 0 ? stateData.state_list[0].admin_state_name : '';


        setValues({
          ...values,
          caretaker_firstname: doctorData.caretaker_firstname,
          caretaker_lastname: doctorData.caretaker_lastname,
          caretaker_phone_number: doctorData.caretaker_phone_number,
          caretaker_email: doctorData.caretaker_email,
          caretaker_profile_image: doctorData.caretaker_profile_image || defaultProfileImage,
          ///
          caretaker_referralcode:doctorData.caretaker_referralcode,
          caretaker_country_code:doctorData.caretaker_country_code,
          caretaker_dob:doctorData.caretaker_dob,
          caretaker_type:doctorData.caretaker_type,
          caretaker_gender:doctorData.caretaker_gender,
          caretaker_address:doctorData.caretaker_address,
          caretaker_country_id:doctorData.caretaker_country_id,
          caretaker_country_name:countryName,
          caretaker_state_id:doctorData.caretaker_state_id,
          caretaker_state_name:stateName,
          caretaker_city_id:doctorData.caretaker_city_id,
          caretaker_city_name:cityName,
          caretaker_pincode:doctorData.caretaker_pincode,
          caretaker_rating:doctorData.caretaker_rating,
          caretaker_apt_number:doctorData.caretaker_apt_number,
          emergency_phone:doctorData.emergency_phone,
          degree_name:doctorData.degree_name,
          university_name:doctorData.university_name,
          caretaker_year_of_passing:doctorData.caretaker_year_of_passing,
          caretaker_work_experience:doctorData.caretaker_work_experience,
          description:doctorData.description,
          driving_license_expiry_date:doctorData.driving_license_expiry_date,
          driving_licence_image:doctorData.driving_licence_image,
          loading: false,
        });
        setProgress(100); 
        setLoading(false); 

      }
    } catch (error) {
      console.error('Error:', error);
      setValues({ ...values, error: 'Failed to load doctor profile.', loading: false });
      setProgress(100); 
      setLoading(false); 

    }
  };

  
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const doctor_id = localStorage.getItem('id');
        caretaker_delete(doctor_id);
        localStorage.removeItem('id');
  
        
        Swal.fire({
          title: 'Deleting Account...',
          text: 'Your account is being deleted. You will be redirected to the login page shortly.',
          icon: 'info',
          showConfirmButton: false,
          timer: 3000, 
        }).then(() => {
          Router.push('/login');
        });
      }
    });
  };
  

  return (
    <div>
      <Head>
        <title>Doctor Profile</title>
        <meta name="viewport" content="initial-scale=1,width=device-width" />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <Header/>
      <LoadingBar
        color="#0000FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
<br></br><br></br><br></br><br></br>
      <div className="container" style={{height:'1000px',width:'1000px',backgroundColor:'white'}}>
       <br></br> <form method="post" style={{height:'1800px'}}>
         <br></br> <div className="row">
            <div className="col-md-4" ><br></br>
              <div className="profile-img">
                <img src={values.caretaker_profile_image} alt="Profile" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head"><br></br><br></br>
                <h3>{`${values.caretaker_firstname} ${values.caretaker_lastname}`}</h3>
                <h4>{`${values.caretaker_type}`} </h4>
                <hr style={{ borderTop: '2px solid #000', margin: '10px 0' }} />
              </div>
            </div>
            <div className="col-md-2">
              <Link href="/caretakereditprofile">
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </Link>
              <input type="button" className="profile-edit-btn" name="btnAddMore" value="Delete Profile" onClick={handleDelete} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p><h4>About You</h4></p>
                <p>{values.description}</p>
              </div>
            </div>
            <div className="col-md-8" style={{paddingTop:'0px'}}>
              <div className="tab-content profile-tab" id="myTabContent" style={{paddingTop:'0px'}}>
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{paddingTop:'0px'}}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_firstname}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Last Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_lastname}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Mobile Number</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_phone_number}</p>
                    </div>
                  </div>
                  <div className="row">
  <div className="col-md-6">
    <label>DOB</label>
  </div>
  <div className="col-md-6">
    <p>{new Date(values.caretaker_dob).toLocaleDateString()}</p>
  </div>
</div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Gender</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_gender}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Address</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_address}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Country</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_country_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>State</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_state_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>City</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_city_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Pincode</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_pincode}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Emergency phone no.</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.emergency_phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Degree</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.degree_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>University</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.university_name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Year of passing</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_year_of_passing}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Work experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>{values.caretaker_work_experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
   </div>
  );
};

export default DoctorProfile;


