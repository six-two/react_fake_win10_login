import React, { useState, useEffect, useMemo } from 'react';
import { ReduxConstants } from '../redux/store';
import { initialSetup } from '../redux/actions';
import * as C from '../redux/constants';
import RenderSettingInfos from './RenderSettingInfos';
import { isValid, parseSettings, asSettings, parseUrl } from './State';
import {
  SettingsInfo, FIELDS_CREDENTIAL_SERVER, FIELDS_CREDENTIAL_LOCAL, FIELDS_WINDOWS
} from './SettingInfos';


export default function SetupView(props: Props) {
  const initialValues = useMemo(() => asSettings(props.constants), [props.constants]);
  const [values, setValues] = useState(initialValues);

  useEffect(
    () => {
      let parsed = parseUrl(initialValues);
      if (parsed) {
        setValues(parsed.settings);
      }
    }, [initialValues]
  );

  function renderSettings(list: SettingsInfo[]) {
    return <RenderSettingInfos
      settings={list}
      state={values}
      setState={setValues}
    />
  }

  function finishSetup(e: any) {
    if (isValid(values)) {
      let constants = parseSettings(values);
      window.location.hash = "";
      initialSetup(constants);
    } else {
      alert("Please check your inputs. At least one of them has an invalid value");
    }
  }

  return <div className="setup">
    <h1>Setup</h1>
      Here you can configure the Kali Linux simulation. Or just skip this step by
      pressing the <code>Start</code> button.
      Fields marked with a "{C.MARKER_CAN_BE_LEFT_EMPTY}" can be left empty to diable said feature.

      <button onClick={finishSetup}>Skip setup</button>

    <h2>Windows settings</h2>
    {renderSettings(FIELDS_WINDOWS)}

    <h2>Credential settings</h2>
      These settings can be used to specify the credentials that a user can use to sucessfully "log in".
      They can also be used to extract the user credentials (via the url fields).
      {renderSettings(FIELDS_CREDENTIAL_SERVER)}

    <h2>Local credential verification</h2>
      If the server defined above can not be reached or does not respond in time,
       these fields will be used to verify the credentials. The fields accept
       regular expressions, which are a powerful way to match text.
       If you are not familiar with them go check out this
       <a href="https://www.computerhope.com/unix/regex-quickref.htm">
      quick start guide to regular expressions
       </a>.
       {renderSettings(FIELDS_CREDENTIAL_LOCAL)}

    <button onClick={finishSetup}>Start</button>
  </div>
}

interface Props {
  constants: ReduxConstants,
}
