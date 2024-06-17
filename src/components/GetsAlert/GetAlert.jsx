import React from 'react';
import './GetAlert.css';

const GetAlert = () => {
    return (
        <div className='fullGetAlert pt-md-4'>
            <div>
                <div className='' style={{textAlign: 'center'}}>
                    <h1>Get Alerts</h1>
                    <h2>for new pools</h2>
                    <h6 className='mt-3 mb-5'>Subscribe to know first when new pools are getting announced and when whitelisting is starting.</h6>
                    {/* desttop version ------------- */}
                    <div className='inputBoxArea mb-5 pb-5'>
                        <div className="input-group">
                            <input type="search" placeholder="Enter email weekly newsletter" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" className="btn">sign up</button>
                        </div>
                    </div>
                </div>

                {/* for mobile version ---------------------------- */}
                <div className='mb-5 pb-3 forMobileVersion'>
                    <input type="search" name="" id="" placeholder="Enter email weekly newsletter" />
                    <br /><br />
                    <button>sign up</button>
                </div>
            </div>
        </div>
    );
};

export default GetAlert;