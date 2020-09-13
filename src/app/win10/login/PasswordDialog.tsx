import React from 'react';
import { connect } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ReduxState } from '../../redux/store';
import { setLoginPassword, tryLogin, setScreen, toggleRevealPassword } from '../../redux/actions';
import * as C from '../../redux/constants';
import { iconUser } from '../../Images';
import { isLoginValid } from '../../VerifyCredentials';


const LoginDialog = (props: Props) => {
    const type = props.revealPassword ? "text" : "password";
    const showRevealButton = props.password && !props.revealPassword;
    const onPasswordChange = (e: any) => setLoginPassword(e.target.value);
    const doLogin = (e: any) => {
        isLoginValid(props.reduxState).then(isValid => tryLogin(isValid));
    };

    return <div className="password-dialog">
        <div className="user-icon">
            <img src={iconUser} alt=""></img>
        </div>
        <div className="user-name">
            <span>TODO: User</span>
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
                        <div className="button reveal" onClick={toggleRevealPassword}>
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
    </div>
}

interface Props {
    revealPassword: boolean,
    password: string,
    failedLogin: boolean,
    reduxState: ReduxState,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        revealPassword: false,
        password: state.var.login.password,
        failedLogin: state.var.login.failed,
        reduxState: state,
    };
};

const ReduxLoginDialog = connect(mapStateToProps)(LoginDialog);
export default ReduxLoginDialog;
