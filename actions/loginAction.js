import { API } from '../config';


export const Adminsignin = adminLogin => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminLogin)
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
