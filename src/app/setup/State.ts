import { ReduxConstants, DEFAULT_CONSTANTS, UserInfo } from '../redux/store';
import { SETTINGS_MAP } from './SettingInfos';
import { checkInput } from './Types';

export interface Settings {
  userNamesAndIcons: string,
  // server verification
  checkLoginCredentialsUrl: string,
  checkDecryptionPasswordUrl: string,
  serverRequestTimeout: string,
  // local verification
  validLoginUsernameRegex: string,
  validLoginPasswordRegex: string,
  validDecryptionPasswordRegex: string,

  [key: string]: string,
}

export function asSettings(constants: ReduxConstants): Settings {
  return {
    userNamesAndIcons: fromUserList(constants.users),
    // server verification
    checkLoginCredentialsUrl: fromStringOrNull(constants.checkLoginCredentialsUrl),
    checkDecryptionPasswordUrl: fromStringOrNull(constants.checkDecryptionPasswordUrl),
    serverRequestTimeout: fromNumber(constants.serverRequestTimeout),
    // local verification
    validLoginUsernameRegex: fromRegex(constants.validLoginUsernameRegex),
    validLoginPasswordRegex: fromRegex(constants.validLoginPasswordRegex),
    validDecryptionPasswordRegex: fromRegex(constants.validDecryptionPasswordRegex),
  };
}

function fromUserList(userList: UserInfo[]): string {
  let asString = '';
  for (const user of userList) {
    if (user.iconUrl) {
      asString += `${user.name}|${user.iconUrl}\n`;
    } else {
      asString += `${user.name}\n`;
    }
  }
  return asString;
}

function fromNumber(value: number): string {
  return "" + value;
}

function fromStringOrNull(value: string | null): string {
  return value || "";
}

// function fromNumberOrNull(value: number | null): string {
//   return value ? "" + value : "";
// }

function fromRegex(value: RegExp): string {
  return value.source;
}

export function isValid(settings: Settings): boolean {
  for (let [key, value] of Object.entries(settings)) {
    let info = SETTINGS_MAP.get(key);
    if (info) {
      let errorMessage = checkInput(info.type, value);
      if (errorMessage) {
        let message = `The value you supplied for "${key}" is not valid!`;
        console.log(message);
        return false;
      }
    } else {
      console.warn(`No input verification defined for "${key}"`);
    }
  }
  return true;
}

export function parseSettings(settings: Settings): ReduxConstants {
  let constants = { ...DEFAULT_CONSTANTS };
  constants.users = parseUserList(settings.userNamesAndIcons);
  //credentials
  constants.checkDecryptionPasswordUrl = stringOrNull(settings.checkDecryptionPasswordUrl);
  constants.checkLoginCredentialsUrl = stringOrNull(settings.checkLoginCredentialsUrl);
  constants.serverRequestTimeout = Number(settings.serverRequestTimeout);
  return constants;
}

function parseUserList(value: string): UserInfo[] {
  const users = [];
  const lines = value.trimEnd().split('\n');

  for (const line of lines) {
    let url = '';
    const fields = line.split('|', 2);
    if (fields.length === 2) {
      url = fields[1];
    }
    users.push({ name: fields[0], iconUrl: url });
  }
  return users;
}

function stringOrNull(value: string): string | null {
  return value ? value : null;
}

// function numberOrNull(value: string): number | null {
//   return value ? Number(value) : null;
// }

export function parseUrl(settings: Settings) {
  // edit a copy
  settings = { ...settings };
  // read url (hash) params
  // if hash has "setup=skip": immediately start the simulation
  let hash = window.location.hash;
  if (hash) {
    let setup;
    let params = new URLSearchParams(hash.substr(1));
    for (let [key, value] of params.entries()) {
      value = decodeURIComponent(value);
      if (value === "null") {
        value = "";
      }
      if (key === "setup") {
        setup = value; //if multiple definitions: only keep the last value
      } else {
        if (settings[key] !== undefined) {
          console.log(`Using url parameter: ${key} -> ${value}`);
          settings[key] = value;
        } else {
          console.warn(`Unknown url parameter: ${key}`);
        }
      }
    }
    return {
      settings: settings,
      skipSetup: setup === "skip"
    };
  }
  return null;
}
