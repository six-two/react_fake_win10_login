import React from 'react';
import { setScreen, setLoginOpenMenu } from '../../redux/actions';
import * as C from '../../redux/constants';
import MenuBarItem from '../../Menu';
import SubMenu from './SubMenu';
import AccessibilityMenu from './MenuAccessibility';
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

const keyboardMenuItems = [{
    name: "English (International)",
    icon: iconKeyboard,
    onClick: () => { },
}];

const todoMenuItems = [{
    name: "TODO",
    icon: "",
    onClick: () => { },
}];

const MenuBar = () => {
    return <div className="menu-bar">
        <SubMenu
            name="keyboard"
            icon={iconKeyboard}
            menuItems={keyboardMenuItems} />
        <SubMenu
            name="internet"
            icon={iconInternet}
            menuItems={todoMenuItems} />
        <AccessibilityMenu
            name="accessibility"
            icon={iconAccessibility} />
        <SubMenu
            name="power"
            icon={iconPower}
            menuItems={powerMenuItems} />
    </div>
}

export default MenuBar;
