import { API } from '../config'; 

export const generateOTP = adminMobileNumber => {
  return fetch(`${API}/generate-otp`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ admin_otp_mobile_no: adminMobileNumber })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const verifyOTP = (adminOTP) => {
    return fetch(`${API}/verify-otp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ admin_otp: adminOTP })
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

export const caretaker_resendOTP = MobileNumber => {
  return fetch(`${API}/caretaker_resendOTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caretaker_phone_number: MobileNumber })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const caretaker_resetPassword  =(caretaker_email,password )=> {
  return fetch(`${API}/caretaker_resetPassword `, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({caretaker_email, password }) 
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const caretaker_forgot_Password_OTP= Email => {
  return fetch(`${API}/caretaker_forgot_Password_OTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ caretaker_email: Email })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};