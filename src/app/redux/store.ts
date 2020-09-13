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
  initialScreen: string,
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
  login: {
    revealPassword: boolean,
    username: string,
    password: string,
    openMenu: string | null,
    failed: boolean,
    attempts: number,
  },
  previousScreen: string | null,
  isFinished: boolean,
}

export const DEFAULT_VARIABLES = {
  screen: {
    name: C.SCREEN_LOCKED,
    changeTime: new Date(),
  },
  login: {
    revealPassword: false,
    username: "",
    password: "",
    openMenu: null,
    failed: false,
    attempts: 0,
  },
  previousScreen: null,
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
