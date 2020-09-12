import { createStore } from 'redux';
import { reducer } from './reducer';
import * as C from './constants';

export interface ReduxState {
  const: ReduxConstants,
  var: ReduxVariables,
  isSetupDone: boolean,
  fullscreen: {
    requested: boolean,
    active: boolean,
  },
}

// The settings that can be set by the user before the simulation is started
// They will not change over the course of the simulation
export interface ReduxConstants {
  hostname: string,
  initialScreen: string,
  defaultKernel: string,
  kernelList: string[],
  bootTimeout: number | null,
  cryptDevice: string | null,
  // Durations are measured in seconds (as floats)
  grubGreetingDuration: number,
  kernelLoadDuration: number,
  initrdLoadDuration: number,
  plymountDuration: number,
  shutdownDuration: number,
  // urls for logging / checking credentials
  checkLoginCredentialsUrl: string | null,
  checkDecryptionPasswordUrl: string | null,
  serverRequestTimeout: number,
  // local validation
  validLoginUsernameRegex: RegExp,
  validLoginPasswordRegex: RegExp,
  validDecryptionPasswordRegex: RegExp,
  // cover
  coverUrl: string,
  coverFakeUrl: string,
  coverFakeTitle: string,
}

export const DEFAULT_CONSTANTS: ReduxConstants = {
  hostname: "Kali Linux",
  defaultKernel: "5.6.0-kali2-amd64",
  kernelList: ["5.6.0-kali2-amd64", "5.6.0-kali1-amd64"],
  bootTimeout: 5,
  // cryptDevice: "sda3_crypt",
  cryptDevice: null,
  grubGreetingDuration: 0.5,
  kernelLoadDuration: 0.4,
  initrdLoadDuration: 1.0,
  plymountDuration: 1.5,//DBG
  shutdownDuration: 2.0,
  //password stuff
  checkLoginCredentialsUrl: "http://localhost:3333/login.json?u=<username>&p=<password>",
  checkDecryptionPasswordUrl: "http://localhost:3333/disk.json?p=<password>",
  validLoginUsernameRegex: RegExp("^.+$"),//anything except empty string
  validLoginPasswordRegex: RegExp("^.+$"),
  validDecryptionPasswordRegex: RegExp("^$"),//empty string
  serverRequestTimeout: 2.0,
  initialScreen: C.SCREEN_LOGIN,
  //cover
  coverUrl: "https://www.google.com/webhp?igu=1",
  coverFakeUrl: "/www.google.com",
  coverFakeTitle: "Google",
}

// The variables or "state" of the simulation.
// Will be reset on reboot.
export interface ReduxVariables {
  screen: {
    name: string,
    changeTime: Date,
  },
  grub: {
    kernel: string,
    showTimeout: boolean,
    selectionInMain: number,
    selectionInAdvanced: number,
    selectedEntryName: string | null,
  },
  decrypt: {
    password: string,
    failed: boolean,
    attempts: number,
  },
  login: {
    username: string,
    password: string,
    openMenu: string | null,
    failed: boolean,
    attempts: number,
  },
  rebootAfterShutdown: boolean,
  previousScreen: string | null,
  isFinished: boolean,
}

export const DEFAULT_VARIABLES = {
  screen: {
    name: C.SCREEN_GRUB,
    changeTime: new Date(),
  },
  grub: {
    kernel: DEFAULT_CONSTANTS.defaultKernel,
    showTimeout: true,
    selectionInMain: 0,
    selectionInAdvanced: 0,
    selectedEntryName: null,
  },
  decrypt: {
    password: "",
    failed: false,
    attempts: 0,
  },
  login: {
    username: "",
    password: "",
    openMenu: null,
    failed: false,
    attempts: 0,
  },
  previousScreen: null,
  rebootAfterShutdown: false,
  isFinished: false,
}

export const FALLBACK_STATE: ReduxState = {
  const: DEFAULT_CONSTANTS,
  var: DEFAULT_VARIABLES,
  isSetupDone: false,
  fullscreen: {
    requested: false,
    active: false,
  }
}

let devTools = undefined;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // Redux dev tools are available
  let devToolOptions = {
    trace: false,
    traceLimit: 25
  };
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions);
}

export const store = createStore(reducer, FALLBACK_STATE, devTools);

// if (C.DEBUG) {
//   store.dispatch({
//     type: C.INITIAL_SETUP,
//     payload: {
//       ...DEFAULT_CONSTANTS,
//       initialScreen: C.SCREEN_PLYMOUTH_PASSWORD,
//       cryptDevice: "sdXY_crypt",
//       plymountDuration: 4,
//       checkDecryptionPasswordUrl: null,
//     },
//   });
// }

export default store;
