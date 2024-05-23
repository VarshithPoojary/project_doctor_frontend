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
