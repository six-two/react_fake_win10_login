import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SELECT_USER: {
      let payload = action.payload as number;
      return {
        ...state,
        login: {
          ...state.login,
          selectedUser: {
            ...state.login.selectedUser,
            index: payload,
            // The rest gets updated afterwards
          },
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
    case C.SET_REVEAL_PASSWORD: {
      let payload = action.payload as boolean;
      return {
        ...state,
        login: {
          ...state.login,
          revealPassword: payload,
        },
      };
    }
    case C.TRY_LOGIN: {
      let success = action.payload as boolean;
      const copy = {
        ...state,
        login: {
          ...state.login,
          revealPassword: false,
          failed: !success,
          attempts: state.login.attempts + 1,
        },
        isFinished: success,
      };
      if (!success) {
        // Clear password
        copy.login.password = '';
      }
      return copy;
    }
    default:
      return state;
  }
}
