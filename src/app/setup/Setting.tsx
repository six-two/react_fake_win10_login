import React from 'react';
import * as C from '../redux/constants';


export default function Setting(props: Props) {
  let hasErrorClass = props.errorMessage ? " has-error" : "";
  return <div className="setting">
    <div className="label" title={props.description}>
      {props.name}
      {props.canBeEmpty &&
        <abbr title="Leave this field empty to disable this feature">
          {C.MARKER_CAN_BE_LEFT_EMPTY}
        </abbr>
      }
    </div>
    <div className={"value-and-error" + hasErrorClass}>
      <div className="value">
        {props.children}
      </div>
      {props.errorMessage &&
        <div className="error">
          {props.errorMessage}
        </div>
      }
    </div>
  </div>
}

interface Props {
  name: string,
  errorMessage?: string | null,
  children: any,
  canBeEmpty: boolean,
  description: string,
}
