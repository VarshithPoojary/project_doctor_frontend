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

export const resendOTP = adminMobileNumber => {
  return fetch(`${API}/resend-otp`, {
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

export const resetPassword =( admin_otp_mobile_no, admin_new_password, admin_confirm_password, admin_otp)=> {
  return fetch(`${API}/reset-password`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      admin_otp_mobile_no,admin_new_password,admin_confirm_password,admin_otp}) 
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

