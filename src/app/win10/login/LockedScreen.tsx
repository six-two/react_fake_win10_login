import React from 'react';
import Clock from 'react-live-clock';


const ScreenLogin = () => {
    return <div className="screen-login-locked v-flex">
        <div className="expand"></div>
        <div className="clock">
            <div className="clock-time"><Clock format={'HH:mm'} /></div>
            <div className="clock-date"><Clock format={'dddd, D MMMM'} /></div>
        </div>
    </div>
}

export default ScreenLogin;
