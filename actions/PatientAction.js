import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const patient_list_by_id  = Data => {
    var id={"_id":Data };
    return fetch(`${API}/patient_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_list_by_id  = Data => {
    var id={"_id":Data };
    return fetch(`${API}/appointment_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_disclaimer_update= appData => {
 
  
    return fetch(`${API}/appointment_disclaimer_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const admin_payment_list = () => {
    return fetch(`${API}/payment_list`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(err => {
        console.error('Error fetching admin payment list:', err);
        throw err;
    });
};