import React from 'react';
import { connect } from 'react-redux';
import { ReduxState, ReduxConstants } from './redux/store';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './kali/ScreenManager';
import ScreenCover from './ScreenCover';
import Setup from './setup/Setup';
import { PreloadImages } from './Images';
import '../css/App.scss';

// TODOs
// setup screen: allow setting all variables, kernels
// Better cover page (close tab: impossible, iframe: url still there, redirect: slow)
// Improve boot anim
// Fix login emblem

// --- Nice to have ---
// Disable autofill on password fields (in Firefox)
// Build my own clock, that does not create error messages in the console

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="app">
      <PreloadImages />
      <FullscreenManager alwaysShowContents={true}>
        {this.renderContent()}
      </FullscreenManager>
    </div>
  }

  renderContent() {
    if (this.props.showSetup) {
      return <Setup constants={this.props.constants} />
    } else {
      let showKali = this.props.isRunning && this.props.isFullscreen;
      return showKali ? <ScreenManager /> : <ScreenCover />;
    }
  }
}

interface State {
}

interface Props {
  isRunning: boolean,
  showSetup: boolean,
  isFullscreen: boolean,
  constants: ReduxConstants,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    isRunning: !state.var.isFinished,
    isFullscreen: state.fullscreen.active,
    showSetup: !state.isSetupDone,
    constants: state.const,
  };
};

const ReduxApp = connect(mapStateToProps)(App);
export default ReduxApp;
