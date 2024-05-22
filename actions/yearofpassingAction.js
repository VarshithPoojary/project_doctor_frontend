import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



export const add_yearOfPassing = passingData => {
    return fetch(`${API}/add_yearOfPassing`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passingData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const YearOfPassing_List = () => {
    return fetch(`${API}/yearOfPassing_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const yearOfPassing_list_by_id = yearPass => {
    var id={"_id":yearPass};
    return fetch(`${API}/yearOfPassing_list_by_id`, {
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


