import { API } from '../config';


export const caretakerlogin = caretakerLogin => {
    return fetch(`${API}/caretakerlogin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caretakerLogin)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const OtpByEmail = otpData => {
    var phone={"caretaker_phone_number":otpData};
    return fetch(`${API}/OtpByEmail`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phone)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (data, callback) => {
    console.log('Authenticating user:', data);
    localStorage.setItem('user', JSON.stringify(data));
    callback();
};

export const caretaker_registration_update = caretakerData => {
    return fetch(`${API}/caretaker_registration_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caretakerData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};