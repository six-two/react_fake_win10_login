import React from 'react';
import { connect } from 'react-redux';
import * as C from '../redux/constants';
import { ReduxState } from '../redux/store';
import ScreenLogin from './login/ScreenLogin';
import LockedScreen from './login/LockedScreen';
import PasswordDialog from './login/PasswordDialog';
import TurnedOffScreen from './TurnedOffScreen';
import ScreenSuspend from './ScreenSuspend';


function preventContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (!C.DEBUG) {
    e.preventDefault();
    e.stopPropagation();
  }
}

class ScreenManager extends React.Component<Props> {
  render() {
    return <div className="screen-manager fill-screen" onContextMenu={preventContextMenu}>
      {this.renderContent()}
    </div>
  }

  renderContent() {
    switch (this.props.screen) {
      case C.SCREEN_LOCKED:
        return <ScreenLogin>
          <LockedScreen />
        </ScreenLogin>
      case C.SCREEN_LOGIN:
        return <ScreenLogin>
          <PasswordDialog />
        </ScreenLogin>
      case C.SCREEN_OFF:
        return <TurnedOffScreen />
      case C.SCREEN_SUSPEND:
        return <ScreenSuspend />
      default:
        return <h1 style={{ color: "red" }}>
          {`Unknown screen: "${this.props.screen}"`}
        </h1>
    }
  }
}

interface Props {
  screen: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    screen: state.var.screen.name,
  };
};

const ReduxScreenManager = connect(mapStateToProps)(ScreenManager);
export default ReduxScreenManager;
