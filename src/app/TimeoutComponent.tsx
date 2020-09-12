import React from 'react';


export default class Timeout extends React.Component<Props> {
  componentDidMount() {
    let durationInMs = Math.round(this.props.timeoutSeconds * 1000);
    (this as any).myTimeout = setTimeout(this.onTimeout, durationInMs);
    console.debug(`Started ${this.props.timeoutSeconds} second timeout`);
  }

  componentWillUnmount() {
    clearTimeout((this as any).myTimeout);
  }

  render() {
    return null;
  }

  onTimeout = () => {
    console.debug(`Finished ${this.props.timeoutSeconds} second timeout`);
    this.props.onComplete();
  }
}

interface Props {
  timeoutSeconds: number,
  onComplete: () => void,
}
