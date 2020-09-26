import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState, ReduxConstants, DEFAULT_CONSTANTS } from './redux/store';
import * as C from './redux/constants';
import { initialSetup, } from './redux/actions';
import FullscreenManager from './FullscreenManager';
import ScreenManager from './win10/ScreenManager';
import ScreenCover from './ScreenCover';
import Setup from './setup/Setup';
import { PreloadImages } from './Images';
import '../css/App.scss';

// TODOs
// Add user names and icons to setup page
// --- Nice to have ---
// add reset to defaults button for settings
// Disable autofill on password fields (in Firefox)
// --- Bugs ---

const App = (props: Props) => {
  useEffect(() => {
    if (C.DEBUG) {
      initialSetup(DEFAULT_CONSTANTS);
    }
  }, []);
  
  let contents;
  if (C.DEBUG) {
    contents = <ScreenManager />
  } else if (props.showSetup) {
    contents = <Setup constants={props.constants} />
  } else {
    let showKali = props.isRunning && props.isFullscreen;
    contents = showKali ? <ScreenManager /> : <ScreenCover />;
  }

  return <div className="app">
    <PreloadImages />
    <FullscreenManager alwaysShowContents={true}>
      {contents}
    </FullscreenManager>
  </div>
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
