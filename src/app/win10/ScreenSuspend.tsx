import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/store';
import { setScreen } from '../redux/actions';

const MIN_SUSPEND_TIME = 1000;//in milliseconds


class ScreenSuspend extends React.Component<Props> {
  render() {
    return <div className="screen-off fill-screen" onClick={this.wakeUp} onContextMenu={this.wakeUp}>
      <KeyboardEventHandler handleKeys={["all"]} handleFocusableElements
        onKeyEvent={this.wakeUp} />
    </div>
  }

  wakeUp = () => {
    let timeDiff = new Date().getTime() - this.props.suspendStart.getTime();
    if (timeDiff >= MIN_SUSPEND_TIME) {
      setScreen(this.props.lastScreen);
    }
  }
}

interface Props {
  lastScreen: string,
  suspendStart: Date,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
  return {
    ...ownProps,
    lastScreen: state.var.previousScreen || "Error: suspend has no last screen set",
    suspendStart: state.var.screen.changeTime,
  };
};

const ReduxScreenSuspend = connect(mapStateToProps)(ScreenSuspend);
export default ReduxScreenSuspend;
