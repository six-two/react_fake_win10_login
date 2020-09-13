import React from 'react';
import Clock from 'react-live-clock';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import * as C from '../../redux/constants';
import {setScreen} from '../../redux/actions';


const ScreenLogin = () => {
    return <div className="screen-login-locked v-flex">
        <KeyboardEventHandler handleKeys={["all"]} handleFocusableElements
            onKeyEvent={() => setScreen(C.SCREEN_LOGIN)} />

        <div className="expand"></div>
        <div className="clock">
            <div className="clock-time"><Clock format={'HH:mm'} /></div>
            <div className="clock-date"><Clock format={'dddd, D MMMM'} /></div>
        </div>
    </div>
}

export default ScreenLogin;
