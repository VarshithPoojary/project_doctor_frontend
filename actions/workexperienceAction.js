import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_workexperience = experienceData => {
    return fetch(`${API}/add_workexperience`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(experienceData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const workExperience_list = () => {
    return fetch(`${API}/workexperience_list`,{
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

export const workexperience_list_by_id = workExp => {
    var id={"_id":workExp};
    return fetch(`${API}/workexperience_list_by_id`, {
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

