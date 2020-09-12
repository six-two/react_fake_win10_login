import * as Actions from './actions';
import * as C from './constants';
import {
  ReduxState, ReduxVariables, ReduxConstants, FALLBACK_STATE, DEFAULT_VARIABLES
} from './store';
import loginReducer from './reducers/login';
import grubReducer from './reducers/grub';
import decryptReducer from './reducers/decrypt';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = FALLBACK_STATE;
  }

  // This is the only event that is allowed to change the ReduxConstants
  switch (action.type) {
    case C.INITIAL_SETUP: {
      let constants = action.payload as ReduxConstants;
      let vars = setScreen(constants.initialScreen, DEFAULT_VARIABLES, constants);
      return {
        const: constants,
        var: vars,
        isSetupDone: true,
        fullscreen: {
          ...state.fullscreen,
          requested: true,
        },
      };
    }
    case C.SET_SETUP_DONE: {
      let isSetupDone = action.payload as boolean;
      return {
        ...state,
        isSetupDone: isSetupDone,
      };
    }
    case C.SET_FULLSCREEN_IS_ACTIVE: {
      let isFullscreenActive = action.payload as boolean;
      return {
        ...state,
        fullscreen: {
          requested: isFullscreenActive,//reset it so it can be set again later
          active: isFullscreenActive,
        },
      }
    }
    case C.SET_FULLSCREEN_IS_REQUESTED: {
      let value = action.payload as boolean;
      return {
        ...state,
        fullscreen: {
          ...state.fullscreen,
          requested: value,
        },
      }
    }
    default: {
      return {
        ...state,
        var: varReducer(state.var, action, state.const),
      };
    }
  }
}


function varReducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
  state = loginReducer(state, action);
  state = grubReducer(state, action);
  state = decryptReducer(state, action);
  state = miscReducer(state, action, constants);
  return state;
}

function miscReducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
  switch (action.type) {
    case C.SET_SCREEN: {
      let newScreen = action.payload as string;
      return setScreen(newScreen, state, constants);
    }
    case C.RESET_STATE: {
      return setScreen(DEFAULT_VARIABLES.screen.name, DEFAULT_VARIABLES, constants);
    }
  }
  return state;
}

export function setScreen(newScreen: string, state: ReduxVariables, constants: ReduxConstants): ReduxVariables {
  // skip password if no crypt device exists
  if (newScreen === C.SCREEN_PLYMOUTH_PASSWORD && !constants.cryptDevice) {
    newScreen = C.SCREEN_PLYMOUTH_BOOT;
  }

  // Handle reboots
  let rebootAfterShutdown = false;
  if (newScreen === C.SCREEN_REBOOT) {
    rebootAfterShutdown = true;
    newScreen = C.SCREEN_SHUTDOWN;
  }

  // Handle suspend and cover
  let needsPreviousScreen = newScreen === C.SCREEN_SUSPEND || newScreen === C.SCREEN_COVER;
  let previousScreen = needsPreviousScreen ? state.screen.name : null;

  return {
    ...state,
    screen: {
      name: newScreen,
      changeTime: new Date(),
    },
    rebootAfterShutdown: rebootAfterShutdown,
    previousScreen: previousScreen,
  };
}

export default reducer;
