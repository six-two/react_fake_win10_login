import React from 'react';


export default class MenuBarItem extends React.Component<Props> {
  render() {
    let onClick = !this.props.disable ? this.onClick : undefined;
    let selected = this.props.disable ? false : this.props.selected;

    let classNames = ["menu-trigger"];
    if (this.props.disable) {
      classNames.push("menu-trigger-disabled");
    } else if (selected) {
      classNames.push("menu-trigger-selected");
    }
    let classes = classNames.join(" ");

    let triggerDom = this.props.icon ?
      <img src={this.props.icon} alt={this.props.name} />
      : this.props.name;
    let menuDom = <div className="menu-popup">{this.props.children}</div>

    return <div>
      <div className={classes} onClick={onClick}>
        {triggerDom}
      </div>
      {selected && menuDom}
    </div>;
  }

  onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    console.log("Menu selected:", this.props.name);
    if (this.props.selected) {
      this.props.close();
    } else {
      this.props.onClick(this.props.name);
    }
  }
}

interface Props {
  name: string,
  icon?: string,
  disable?: boolean,
  selected: boolean,
  onClick: (name: string) => void,
  close: () => void,
}
