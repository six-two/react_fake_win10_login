import React, { Component } from "react";
import Fullscreen from "react-full-screen";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setIsFullscreenActive, requestFullscreen } from './redux/actions';


class FullscreenManager extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // isFullscreen: true,
    };
  }

  // requestFullscreen = () => {
  //   this.setState({ isFullscreen: true });
  // }

  render() {
    let showContents = this.props.isFullscreen;
    if (this.props.alwaysShowContents === true) {
      showContents = true;
    }
    return (
      <div>
        <KeyboardEventHandler handleKeys={["ctrl+space"]} handleFocusableElements
          onKeyEvent={() => requestFullscreen(true)} />

        <Fullscreen
          enabled={this.props.requestFullscreen}
          onChange={isFullscreen => setIsFullscreenActive(isFullscreen)}
        >
          {showContents && this.props.children}
        </Fullscreen>
      </div>
    );
  }
}

interface Props {
  alwaysShowContents?: boolean,
  requestFullscreen: boolean,
  isFullscreen: boolean,
}

interface State {
  // isFullscreen: boolean;
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
