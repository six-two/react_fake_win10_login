import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SET_LOGIN_USERNAME: {
      let payload = action.payload as string;
      return {
        ...state,
        login: {
          ...state.login,
          username: payload,
        },
      };
    }
    case C.SET_LOGIN_PASSWORD: {
      let payload = action.payload as string;
      return {
        ...state,
        login: {
          ...state.login,
          password: payload,
        },
      };
    }
    case C.TRY_LOGIN: {
      let success = action.payload as boolean;
      return {
        ...state,
        login: {
          ...state.login,
          failed: !success,
          attempts: state.login.attempts + 1,
        },
        isFinished: success,
      };
    }
    case C.SET_LOGIN_OPEN_MENU: {
      let payload = action.payload as string | null;
      return {
        ...state,
        login: {
          ...state.login,
          openMenu: payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}
