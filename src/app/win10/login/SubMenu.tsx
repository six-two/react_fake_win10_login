import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setLoginOpenMenu } from '../../redux/actions';
import MenuBarItem from '../../Menu';


function renderMenuItem(item: MenuItem) {
    let onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setLoginOpenMenu(null);
        item.onClick && item.onClick();
    };
    return <div className="menu-item" onClick={onClick} key={item.name}>
        {!!item.icon && <img className="icon" src={item.icon} alt="" />}
        <div className="name">{item.name}</div>
    </div>
}

const SubMenu = (menu: Props) => {
    let selected = menu.name === menu.openMenu;

    return <MenuBarItem name={menu.name} icon={menu.icon}
        selected={selected}
        onClick={setLoginOpenMenu}
        close={() => setLoginOpenMenu(null)}>

        <div className="menu">
            {menu.menuItems.map(renderMenuItem)}
        </div>
    </MenuBarItem>
}


interface Props {
    openMenu: string | null,
    name: string,
    icon: string,
    menuItems: MenuItem[],
}

interface MenuItem {
    name: string,
    icon?: string,
    onClick?: () => void,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        openMenu: state.var.login.openMenu,
    };
};

const ReduxMenuBar = connect(mapStateToProps)(SubMenu);
export default ReduxMenuBar;
