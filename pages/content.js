import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { FaFlask } from "react-icons/fa";

const Users = () => {
    const [values, setValues] = useState({
        labCount: 0,
        logsCount: 0,
        error: false,
        success: false,
        removed: false,

    });
    const { labCount, logsCount, error, success, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadUsers();
    }, [success, removed]);

    const loadUsers = () => {



        // getdashboardDatas(token).then(data => {
        //     if (data.error) {
        //         console.log(data.error);
        //     } else {

        //   setValues({ ...values,labCount:data.labs,logsCount:data.logs});

        //     }
        // });



    };


    function content() {

        return (
            <div id="wrapper">

                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        {/* <div className="page-title-right">

                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">Employee</li>
                                                <li className="breadcrumb-item active">Dashboard</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Dashboard</h4> */}

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                {/* <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                 

                    <div className="card-box tilebox-one" style={{ height: '128px', color:'black'}}>
              <i className="float-right"><FaFlask style={{ padding: '1px'}} /></i>
              <h5 className="text-muted text-uppercase mb-3">Laboratories</h5>
              <h4 className="mb-3" data-plugin="">{labCount}</h4>
                 </div>
          
      </div>   */}
                                {/* <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                 

                 <div className="card-box tilebox-one" style={{ height: '128px', color:'black'}}>
           <i className="fe-users float-right"></i>
           <h5 className="text-muted text-uppercase mb-3">Logistics Partner</h5>
           <h4 className="mb-3" data-plugin="">{logsCount}</h4>
              </div>
       
   </div>  */}
                                {/* <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                 

                 <div className="card-box tilebox-one" style={{ height: '128px', color:'black'}}>
           <i className="fe-file-text float-right"></i>
           <h5 className="text-muted text-uppercase mb-3">Pending</h5>
           <h4 className="mb-3" data-plugin="">{pendingCount}</h4>
              </div>
       
   </div>   
   <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                 

                 <div className="card-box tilebox-one" style={{ height: '128px', color:'black'}}>
           <i className="fas fa-thumbs-up float-right"></i>
           <h5 className="text-muted text-uppercase mb-3">Approval</h5>
           <h4 className="mb-3" data-plugin="">{approvedCount}</h4>
              </div>
       
   </div>  
   <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                 

                 <div className="card-box tilebox-one" style={{ height: '128px', color:'black'}}>
           <i className="fas fa-thumbs-down float-right"></i>
           <h5 className="text-muted text-uppercase mb-3">Decline</h5>
           <h4 className="mb-3" data-plugin="">{declineCount}</h4>
              </div>
       
   </div>   */}


                            </div>


                        </div>
                    </div>



                </div>
            </div>
        );

    };
    return <React.Fragment>
        {content()}

    </React.Fragment>
}
export default Users;

