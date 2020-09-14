import React from "react";
import Fullscreen from "react-full-screen";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setIsFullscreenActive, requestFullscreen } from './redux/actions';


const FullscreenManager = (props: Props) => {
  let showContents = props.isFullscreen;
  if (props.alwaysShowContents === true) {
    showContents = true;
  }
  return (
    <div>
      <KeyboardEventHandler handleKeys={["ctrl+space"]} handleFocusableElements
        onKeyEvent={() => requestFullscreen(true)} />

      <Fullscreen
        enabled={props.requestFullscreen}
        onChange={isFullscreen => setIsFullscreenActive(isFullscreen)}
      >
        {showContents && props.children}
      </Fullscreen>
    </div>
  );
}


interface Props {
  alwaysShowContents?: boolean,
  requestFullscreen: boolean,
  isFullscreen: boolean,
  children: any,
}

// export default FullscreenManager;
const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    requestFullscreen: state.fullscreen.requested,
    isFullscreen: state.fullscreen.active,
  };
};

const ReduxFullscreenManager = connect(mapStateToProps)(FullscreenManager);
export default ReduxFullscreenManager;
