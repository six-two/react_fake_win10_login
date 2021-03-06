import * as C from '../redux/constants';


export interface SettingsInfo {
  title: string,
  name: string,
  description: string,
  type: string,
}

const USER_NAMES_AND_ICONS: SettingsInfo = {
  title: "User names and icons",
  name: "userNamesAndIcons",
  description: "Format:\nusername1|https://example.com/user1.png\nuserWithDefaultImage\nuser three|https://example.com/path/to/image/user_2.jpeg",
  type: C.TYPE_USERNAMES_AND_ICONS,
};

const BG_IMG_URL: SettingsInfo = {
  title: "Background image URL",
  name: "bgImgUrl",
  description: "The URL of the background image you want to use",
  type: C.TYPE_URL_OR_NULL,
};

const CHECK_LOGIN_URL: SettingsInfo = {
  title: "Check login URL",
  name: "checkLoginCredentialsUrl",
  description: "The URL to send a request to when the user tries to log in",
  type: C.TYPE_TEMPLATE_URL_USER_PASS,
};

const URL_VERIFICATION_TIMEOUT: SettingsInfo = {
  title: "Server verification timeout",
  name: "serverRequestTimeout",
  description: "How long to wait for a response from the server, before falling " +
    "back on the regular expression check. Setting the value too high can cause a visible delay " +
    "if the server is not reachable / responding",
  type: C.TYPE_TIMEOUT,
};

const REGEX_DECRYPT_PASSWORD: SettingsInfo = {
  title: "Decryption password",
  name: "validDecryptionPasswordRegex",
  description: "Accept the disk password if it matches this regular expression",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_USERNAME: SettingsInfo = {
  title: "Login username",
  name: "validLoginUsernameRegex",
  description: "Accept the login username if it matches this regular expression",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_PASSWORD: SettingsInfo = {
  title: "Login password",
  name: "validLoginPasswordRegex",
  description: "Accept the login password if it matches this regular expression",
  type: C.TYPE_REGEX,
};


export const FIELDS_WINDOWS = [USER_NAMES_AND_ICONS, BG_IMG_URL];
export const FIELDS_CREDENTIAL_SERVER = [CHECK_LOGIN_URL, URL_VERIFICATION_TIMEOUT];
export const FIELDS_CREDENTIAL_LOCAL = [REGEX_DECRYPT_PASSWORD, REGEX_LOGIN_USERNAME,
  REGEX_LOGIN_PASSWORD];

const ALL_SETTINGS = [...FIELDS_WINDOWS, ...FIELDS_CREDENTIAL_SERVER, ...FIELDS_CREDENTIAL_LOCAL];

export const SETTINGS_MAP = new Map<string, SettingsInfo>();
for (let s of ALL_SETTINGS) {
  SETTINGS_MAP.set(s.name, s);
}
