import React from 'react'

export default class SimpleCountdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    (this as any).myInterval = setInterval(this.update, 1000);
  }

  componentWillUnmount() {
    clearInterval((this as any).myInterval);
  }

  update = () => {
    if (this.getRemainingSeconds() <= 0) {
      clearInterval((this as any).myInterval);
      this.props.onCompleted();
    } else {
      this.setState(this.state);// cause rerender
    }
  }

  getRemainingSeconds() {
    let now = Date.now();
    let end = this.props.startDate.getTime() + 1000 * this.props.seconds;
    return (end - now) / 1000;
  }

  render() {
    let format = this.props.formatString || "%s";
    let secondsRemaining = this.getRemainingSeconds();
    if (secondsRemaining <= 0) {
      return null;
    }
    let secondsAsText = "" + Math.ceil(secondsRemaining - 0.1);
    return <div className="countdown">
      {format.replace("%s", secondsAsText)}
    </div>
  }
}

interface Props {
  startDate: Date,
  seconds: number,
  onCompleted: () => void,
  formatString?: string,
}

interface State {
}
