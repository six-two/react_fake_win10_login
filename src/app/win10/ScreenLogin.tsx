import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/store';
import { setLoginOpenMenu } from '../redux/actions';
import { imageBackground } from '../Images';


class ScreenLogin extends React.Component<Props> {
  render() {
    return <div className="screen-login">
      <img className="fill-screen" src={imageBackground} alt=""></img>
      <div className="fill-screen v-flex" onClick={this.closeMenu}>
        <div className="expand"></div>
        {this.props.children}
        <div className="expand"></div>
      </div>
    </div>
  }

  closeMenu = () => {
    if (this.props.isMenuOpen) {
      setLoginOpenMenu(null);
    }
  }
}

interface Props {
  isMenuOpen: boolean,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isMenuOpen: state.var.login.openMenu !== null,
  };
};

const ReduxScreenLogin = connect(mapStateToProps)(ScreenLogin);
export default ReduxScreenLogin;
