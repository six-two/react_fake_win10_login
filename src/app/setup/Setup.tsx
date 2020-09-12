import React from 'react';
import { ReduxConstants, DEFAULT_CONSTANTS } from '../redux/store';
import { initialSetup } from '../redux/actions';
import * as C from '../redux/constants';
import Setting from './Setting';
import { Settings } from './State';
import { renderInput, checkInput, allowsEmptyInput } from './Types';
import { isValid, parseSettings, asSettings, parseUrl } from './State';
import {
  SettingsInfo, FIELDS_GENERAL, FIELDS_TIMING,
  FIELDS_CREDENTIAL_SERVER, FIELDS_CREDENTIAL_LOCAL
} from './SettingInfos';

const DEFAULT_SETTINGS = asSettings(DEFAULT_CONSTANTS);


class SetupView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      settings: asSettings(props.constants),
    };
  }

  componentDidMount() {
    let parsed = parseUrl(this.state.settings);
    if (parsed) {
      this.setState({ settings: parsed.settings });
      // if (parsed.skipSetup) {
      //   console.log("Trying to skip setup");
      //   this.start(parsed.settings, false);
      // }
    }
  }

  getParamString() {
    let params = [];
    for (let [key, value] of Object.entries(this.state.settings)) {
      value = encodeURIComponent(value);
      if (value === "") {
        value = "null";
      }
      params.push(`${key}=${value}`);
    }
    return params.join("&");
  }

  render() {
    return <div className="setup">
      <h1>Setup</h1>
      Here you can configure the Kali Linux simulation. Or just skip this step by
      pressing the <code>Start</code> button.
      Fields marked with a "{C.MARKER_CAN_BE_LEFT_EMPTY}" can be left empty to diable said feature.

      <button onClick={() => this.start(this.state.settings, true)}>Skip setup</button>

      <h2>General settings</h2>
      {this.renderSettings(FIELDS_GENERAL)}

      <h2>Timing settings</h2>
      All values below are measured in seconds. Negative values are not allowed.
      {this.renderSettings(FIELDS_TIMING)}

      <h2>Credential settings</h2>
      These settings can be used to specify the credentials that a user can use to sucessfully "log in".
      They can also be used to extract the user credentials (via the url fields).
      {this.renderSettings(FIELDS_CREDENTIAL_SERVER)}

      <h2>Local credential verification</h2>
      If the server defined above can not be reached or does not respond in time,
       these fields will be used to verify the credentials. The fields accept
       regular expressions, which are a powerful way to match text.
       If you are not familiar with them go check out this
       <a href="https://www.computerhope.com/unix/regex-quickref.htm">
        quick start guide to regular expressions
       </a>.
       {this.renderSettings(FIELDS_CREDENTIAL_LOCAL)}

      <button onClick={() => this.start(this.state.settings, true)}>Start</button>
    //TODO add reset to defaults button
    </div>
  }

  renderSettings(list: SettingsInfo[]) {
    return <div className="settings">
      {list.map(this.renderGenericSetting)}
    </div>
  }

  renderGenericSetting = (setting: SettingsInfo) => {
    let value = this.state.settings[setting.name];
    let defaultValue = DEFAULT_SETTINGS[setting.name];
    let errorMessage = checkInput(setting.type, value);
    let canBeEmpty = allowsEmptyInput(setting.type);
    let onChangeCallback = (newValue: string) => {
      let copy = { ...this.state.settings };
      copy[setting.name] = newValue;
      this.setState({ settings: copy });
    }

    return <Setting key={setting.name} name={setting.title}
      canBeEmpty={canBeEmpty} errorMessage={errorMessage} description={setting.description}>
      {renderInput(setting.type, defaultValue, value, onChangeCallback)}
    </Setting>
  }

  start(settings: Settings, alertOnError: boolean) {
    if (isValid(settings)) {
      let constants = parseSettings(settings);
      window.location.hash = "";
      initialSetup(constants);
      return true;
    } else {
      if (alertOnError) {
        alert("Please check your inputs. At least one of them has an invalid value");
      }
      return false;
    }
  }
}


interface State {
  settings: Settings,
}

interface Props {
  constants: ReduxConstants,
}

export default SetupView;
