import React from 'react';
import { DEFAULT_CONSTANTS } from '../redux/store';
import Setting from './Setting';
import { Settings } from './State';
import { renderInput, checkInput, allowsEmptyInput } from './Types';
import { asSettings } from './State';
import {
    SettingsInfo
} from './SettingInfos';

const DEFAULT_SETTINGS = asSettings(DEFAULT_CONSTANTS);


export default function RenderSettingsInfos(props: Props) {
    return <div className="settings">
        {props.settings.map((setting: SettingsInfo) => {
            let value = props.state[setting.name];
            let defaultValue = DEFAULT_SETTINGS[setting.name];
            let errorMessage = checkInput(setting.type, value);
            let canBeEmpty = allowsEmptyInput(setting.type);
            let onChangeCallback = (newValue: string) => {
                let copy = { ...props.state };
                copy[setting.name] = newValue;
                props.setState(copy);
            }

            return <Setting key={setting.name} name={setting.title}
                canBeEmpty={canBeEmpty} errorMessage={errorMessage} description={setting.description}>
                {renderInput(setting.type, defaultValue, value, onChangeCallback)}
            </Setting>
        })}
    </div>
}

interface Props {
    settings: SettingsInfo[],
    state: Settings,
    setState: (value: Settings) => void,
}
