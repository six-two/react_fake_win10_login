import React from 'react';
import { connect } from 'react-redux';
import * as C from '../redux/constants';
import { ReduxState } from '../redux/store';


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
      // case C.SCREEN_COVER:
      //   return <ScreenCover />
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
