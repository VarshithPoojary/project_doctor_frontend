import React, { Component } from 'react';
import axios from 'axios';

import { API } from '../config';

import { updateAdminProfileImage } from '../actions/profileAction';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            profileImg: ''
        }
    }
    onFileChange(e) {
        this.setState({profileImg: e.target.files[0]})
    }
    onSubmit(e) {
        e.preventDefault()
        let id = localStorage.getItem('id');
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg);
        formData.append('_id', id);
        axios.post(`${API}/upload-admin-profile-image`, formData, {
        }).then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}