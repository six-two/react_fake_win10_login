import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setScreen, setLoginOpenMenu } from '../../redux/actions';
import * as C from '../../redux/constants';
import MenuBarItem from '../../Menu';
import { iconAccessibility, iconInternet, iconKeyboard, iconPower, iconRestart, iconSleep } from '../../Images';


const POWER_MENU: MenuData = {
    name: "power",
    icon: iconPower,
    menuItems: [{
        name: "Sleep",
        icon: iconSleep,
        onClick: () => setScreen(C.SCREEN_SUSPEND),
    }, {
        name: "Shut down",
        icon: iconPower,
        onClick: () => setScreen(C.SCREEN_OFF),
    }, {
        name: "Restart",
        icon: iconRestart,
        onClick: () => alert('Reboot'),
    }],
}

function PlaceholderMenu(icon: string) {
    return <MenuBarItem name={"Doesnt matter"} icon={icon}
        selected={false}
        onClick={(e) => setLoginOpenMenu(null)}
        close={() => {}}>

        <div className="menu">
            Not used
        </div>
    </MenuBarItem>
}

class MenuBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="menu-bar">
            {PlaceholderMenu(iconKeyboard)}
            {PlaceholderMenu(iconInternet)}
            {PlaceholderMenu(iconAccessibility)}
            {this.renderMenu(POWER_MENU)}
        </div>
    }

    renderMenu(menu: MenuData) {
        let selected = menu.name === this.props.openMenu;

        return <div>
            <MenuBarItem name={menu.name} icon={menu.icon}
                selected={selected}
                onClick={this.onMenuSelected}
                close={this.closeCurrentMenu}>

                <div className="menu">
                    {menu.menuItems.map(this.renderMenuItem)}
                </div>
            </MenuBarItem>
        </div>
    }

    renderMenuItem(item: MenuItem) {
        let onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setLoginOpenMenu(null);
            item.onClick && item.onClick();
        };
        return <div className="menu-item" onClick={onClick} key={item.name}>
            <div className="icon">
                <img src={item.icon} alt="" />
            </div>
            <div className="name">{item.name}</div>
        </div>
    }

    onMenuSelected = (name: string) => {
        setLoginOpenMenu(name);
    }

    closeCurrentMenu = () => {
        setLoginOpenMenu(null);
    }
}

interface State {
}

interface Props {
    openMenu: string | null,
}

interface MenuData {
    name: string,
    icon: string,
    menuItems: MenuItem[],
}

interface MenuItem {
    name: string,
    icon: string,
    onClick?: () => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        openMenu: state.var.login.openMenu,
    };
};

const ReduxMenuBar = connect(mapStateToProps)(MenuBar);
export default ReduxMenuBar;
