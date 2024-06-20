import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const admin_specialist_type_list = () => {
    return fetch(`${API}/specialistType_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};

export const add_slot = slotData => {
    return fetch(`${API}/add_slot`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(slotData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_list_by_caretakerId= appData => {
    var id={"caretaker_id":appData};
    return fetch(`${API}/appointment_list_by_caretakerId`, {
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

export const appointment_list= () => {
    return fetch(`${API}/appointment_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_list_by_caretakerId_and_date= appData => {
    const { caretaker_id, date } = appData;
    const id = { caretaker_id, date };
  
    return fetch(`${API}/appointment_list_by_caretakerId_and_date`, {
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
 
export const slot_listby_caretaker_id = appData => {
    var id={"caretaker_id":appData};
    return fetch(`${API}/slot_listby_caretaker_id `, {
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
