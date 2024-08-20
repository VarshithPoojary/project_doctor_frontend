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
    return fetch(`${API}/slot_listby_caretaker_id`, {
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
export const slot_time_delete= appData => {
    const id={"_id":appData};
    return fetch(`${API}/slot_time_delete`, {
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


export const appointment_reject_accept1 = async (appData) => {
    const { appointmentId, status } = appData;

    try {
        const response = await fetch(`${API}/appointment_reject_accept1`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appointmentId, status })
        });

        if (!response.ok) {
            throw new Error('Failed to accept/reject appointment');
        }

        return response.json();
    } catch (error) {
        console.error('Error in appointment_reject_accept:', error);
        throw new Error('Failed to communicate with the server');
    }
};
export const accepted_appointmentlist_by_caretakerId= appData => {
    var id={"caretaker_id":appData};
    return fetch(`${API}/accepted_appointmentlist_by_caretakerId`, {
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
export const appointment_cancel= appData => {
    const { appointmentId,cancelReason,canceled_type } = appData;
    const id = {appointmentId,cancelReason,canceled_type };
  
    return fetch(`${API}/appointment_cancel`, {
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


export const completed_appointmentlist_by_caretakerId = appData => {
    var id={"caretaker_id":appData};
    return fetch(`${API}/completed_appointmentlist_by_caretakerId`, {
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