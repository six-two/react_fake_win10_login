import * as Actions from './actions';
import * as C from './constants';
import {
  ReduxState, ReduxVariables, ReduxConstants, FALLBACK_STATE, DEFAULT_VARIABLES
} from './store';
import loginReducer, {setLoginPassword} from './reducers/login';
import {defaultUserIcon} from '../Images';

export function reducer(state: ReduxState | undefined, action: Actions.Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = FALLBACK_STATE;
  }

  // This is the only event that is allowed to change the ReduxConstants
  switch (action.type) {
    case C.INITIAL_SETUP: {
      let constants = action.payload as ReduxConstants;
      constants = {
        ...constants,
        users: constants.users.map(user => {
          // Replace empty urls with the default version
          const iconUrl = user.iconUrl ? user.iconUrl : defaultUserIcon;
          return {
            ...user,
            iconUrl,
          }
        })
      }
      let vars = setScreen(constants.initialScreen, DEFAULT_VARIABLES, constants);
      vars = updateSelectedUser(constants, vars);
      return {
        const: constants,
        var: vars,
        isSetupDone: true,
        fullscreen: {
          ...state.fullscreen,
          requested: !C.DEBUG,
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
  state = miscReducer(state, action, constants);
  return state;
}

function miscReducer(state: ReduxVariables, action: Actions.Action, constants: ReduxConstants): ReduxVariables {
  switch (action.type) {
    case C.SET_SCREEN: {
      let newScreen = action.payload as string;
      state = setScreen(newScreen, state, constants);
      break;
    }
    case C.RESET_STATE: {
      state = setScreen(DEFAULT_VARIABLES.screen.name, DEFAULT_VARIABLES, constants);
      break;
    }
    case C.SELECT_USER: {
      state = updateSelectedUser(constants, state);
    }
  }
  return state;
}

function updateSelectedUser(constants: ReduxConstants, state: ReduxVariables): ReduxVariables {
  const index = state.login.selectedUser.index;
  const user = constants.users[index];
  return {
    ...state,
    login: {
      ...state.login,
      selectedUser: {
        index: index,
        name: user.name,
        iconUrl: user.iconUrl,
      },
    },
  }
}

export function setScreen(newScreen: string, state: ReduxVariables, constants: ReduxConstants): ReduxVariables {
  // Handle suspend and cover
  let needsPreviousScreen = newScreen === C.SCREEN_SUSPEND || newScreen === C.SCREEN_COVER;
  let previousScreen = needsPreviousScreen ? state.screen.name : null;

  if (newScreen === C.SCREEN_LOGIN) {
    state = setLoginPassword(state, "");
  }

  return {
    ...state,
    screen: {
      name: newScreen,
      changeTime: new Date(),
    },
    previousScreen: previousScreen,
  };
}

export default reducer;
