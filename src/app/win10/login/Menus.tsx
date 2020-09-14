import React from 'react';
import { setScreen, setLoginOpenMenu } from '../../redux/actions';
import * as C from '../../redux/constants';
import MenuBarItem from '../../Menu';
import SubMenu from './SubMenu';
import { iconAccessibility, iconInternet, iconKeyboard, iconPower, iconRestart, iconSleep } from '../../Images';


const powerMenuItems = [{
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
}];

interface PlaceholderProps {
    icon: string,
}

function PlaceholderMenu(props: PlaceholderProps) {
    return <MenuBarItem
        name={"Doesnt matter"}
        icon={props.icon}
        selected={false}
        onClick={(e) => setLoginOpenMenu(null)}
        close={() => setLoginOpenMenu(null)}>

        <div className="menu">
            Not used
        </div>
    </MenuBarItem>
}

const MenuBar = () => {
    return <div className="menu-bar">
        <PlaceholderMenu icon={iconKeyboard} />
        <PlaceholderMenu icon={iconInternet} />
        <PlaceholderMenu icon={iconAccessibility} />
        <SubMenu
            name="power"
            icon={iconPower}
            menuItems={powerMenuItems} />
    </div>
}

export default MenuBar;
