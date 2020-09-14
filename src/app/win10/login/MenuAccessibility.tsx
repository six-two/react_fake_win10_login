import React, { useState } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import { ReduxState } from '../../redux/store';
import { setLoginOpenMenu } from '../../redux/actions';
import MenuBarItem from '../../Menu';


interface SwitchBarProps {
    title: string,
}

const SwitchBar = (props: SwitchBarProps) => {
    // TODO: this looses state, once the menu is hidden
    const [checked, setChecked] = useState(false);

    return <div className="switch-bar">
        <div className="title">{props.title}</div>
        <div className="h-flex">
            <span className="state">{checked ? 'On' : 'Off'}</span>
            <div className="expand"></div>
            <Switch onChange={setChecked} checked={checked} />
        </div>
    </div>
}

const AccessibilityMenu = (menu: Props) => {
    let selected = menu.name === menu.openMenu;

    return <MenuBarItem name={menu.name} icon={menu.icon}
        selected={selected}
        onClick={setLoginOpenMenu}
        close={() => setLoginOpenMenu(null)}>

        <div className="accessibility-menu v-flex" onClick={(e) => e.stopPropagation()}>
            <SwitchBar title="Narrator" />
            <div className="normal">Magnifier</div>
            <div className="normal">On-Screen Keyboard</div>
            <SwitchBar title="High Contrast" />
            <SwitchBar title="Sticky Keys" />
            <SwitchBar title="Filter Keys" />
        </div>
    </MenuBarItem>
}

interface Props {
    openMenu: string | null,
    name: string,
    icon: string,
}

const mapStateToProps = (state: ReduxState, ownProps: any) => {
    return {
        ...ownProps,
        openMenu: state.var.login.openMenu,
    };
};

const ReduxMenuBar = connect(mapStateToProps)(AccessibilityMenu);
export default ReduxMenuBar;
