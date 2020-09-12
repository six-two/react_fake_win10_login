export const DEBUG = false;

export const MARKER_CAN_BE_LEFT_EMPTY = "*";

export const PLACEHOLDER_USERNAME = "<username>";
export const PLACEHOLDER_PASSWORD = "<password>";

// action types
export const SET_FULLSCREEN_IS_REQUESTED = "SET_FULLSCREEN_IS_REQUESTED";
export const SET_FULLSCREEN_IS_ACTIVE = "SET_FULLSCREEN_IS_ACTIVE";
export const SET_LOGIN_USERNAME = "SET_LOGIN_USERNAME";
export const SET_LOGIN_PASSWORD = "SET_LOGIN_PASSWORD";
export const SET_DECRYPT_PASSWORD = "SET_DECRYPT_PASSWORD";
export const SET_SCREEN = "SET_SCREEN";
export const SET_HOSTNAME = "SET_HOSTNAME";
export const SET_LOGIN_OPEN_MENU = "SET_LOGIN_OPEN_MENU";
export const SET_GRUB_MAIN_SELECTED = "SET_GRUB_MAIN_SELECTED";
export const SET_GRUB_ADVANCED_SELECTED = "SET_GRUB_ADVANCED_SELECTED";
export const TRY_LOGIN = "TRY_LOGIN";
export const TRY_DECRYPT = "TRY_DECRYPT";
export const SET_KERNEL_AND_BOOT = "SET_KERNEL_AND_BOOT";
export const RESET_STATE = "RESET_STATE";
export const INITIAL_SETUP = "INITIAL_SETUP";
export const SET_SETUP_DONE = "SET_SETUP_DONE";//should only be used for browser history

// power related screen
export const SCREEN_OFF = "SCREEN_OFF";
export const SCREEN_SUSPEND = "SCREEN_SUSPEND";
// normal screens
export const SCREEN_LOGIN = "SCREEN_LOGIN";
//
export const SCREEN_COVER = "SCREEN_COVER";

// input types
export const TYPE_STRING = "TYPE_STRING";
export const TYPE_STRING_OR_NULL = "TYPE_STRING_OR_NULL";
export const TYPE_TIMEOUT = "TYPE_TIMEOUT";
export const TYPE_TIMEOUT_OR_NULL = "TYPE_TIMEOUT_OR_NULL";
export const TYPE_INITIAL_SCREEN = "TYPE_INITIAL_SCREEN";
export const TYPE_REGEX = "TYPE_REGEX";
export const TYPE_TEMPLATE_URL_PASS = "TYPE_TEMPLATE_URL_PASS";
export const TYPE_TEMPLATE_URL_USER_PASS = "TYPE_TEMPLATE_URL_USER_PASS";
