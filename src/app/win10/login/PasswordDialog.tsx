import React from 'react';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ReduxState, SelectedUser } from '../../redux/store';
import { setLoginPassword, tryLogin, setScreen, setRevealPassword } from '../../redux/actions';
import * as C from '../../redux/constants';
import { isLoginValid } from '../../VerifyCredentials';
import UserList from './UserList';


const LoginDialog = (props: Props) => {
    const type = props.revealPassword ? "text" : "password";
    const showRevealButton = props.password;
    const onPasswordChange = (e: any) => setLoginPassword(e.target.value);
    const doLogin = (e: any) => {
        isLoginValid(props.reduxState).then(isValid => tryLogin(isValid));
    };
    const showPassword = (e: any) => setRevealPassword(true);
    const hidePassword = (e: any) => {
        if (props.revealPassword) {
            setRevealPassword(false);
        }
    };

    return <div className="password-dialog">
        <div className="user-icon">
            <img src={props.user.iconUrl} alt=""></img>
        </div>
        <div className="user-name">
            <span>{props.user.name}</span>
        </div>
        <KeyboardEventHandler
            handleKeys={["enter"]}
            onKeyEvent={doLogin}>
            <div className="password-div h-flex">
                <div className="password-wrapper h-flex">
                    <input
                        type={type}
                        value={props.password}
                        onChange={onPasswordChange}
                        placeholder="Password"
                        autoFocus
                        autoComplete="off" />
                    {showRevealButton &&
                        <div className="button reveal" onMouseDown={showPassword}
                            onMouseUp={hidePassword} onMouseLeave={hidePassword}>
                            <span role="img" aria-label="show">👁️</span>
                        </div>
                    }
                </div>
                <div className="button login" onClick={doLogin}>
                    <span role="img" aria-label="go">🡢</span>
                </div>
            </div>
        </KeyboardEventHandler>
        {props.failedLogin &&
            <div className="reset-password">
                <span onClick={(e: any) => setScreen(C.SCREEN_PASSWORD_RESET)}>
                    Reset password
                </span>
            </div>
        }
        <UserList />
    </div>
}

interface Props {
    user: SelectedUser,
    revealPassword: boolean,
    password: string,
    failedLogin: boolean,
    reduxState: ReduxState,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        user: state.var.login.selectedUser,
        revealPassword: state.var.login.revealPassword,
        password: state.var.login.password,
        failedLogin: state.var.login.failed,
        reduxState: state,
    };
};

const ReduxLoginDialog = connect(mapStateToProps)(LoginDialog);
export default ReduxLoginDialog;
