import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SET_DECRYPT_PASSWORD: {
      let payload = action.payload as string;
      return {
        ...state,
        decrypt: {
          ...state.decrypt,
          password: payload,
        },
      };
    }
    case C.TRY_DECRYPT: {
      let success = action.payload as boolean;
      let newScreen = success ? C.SCREEN_PLYMOUTH_BOOT : C.SCREEN_PLYMOUTH_PASSWORD;
      let password = success ? state.decrypt.password : "";
      return {
        ...state,
        decrypt: {
          ...state.decrypt,
          password: password,
          failed: !success,
          attempts: state.decrypt.attempts + 1,
        },
        screen: {
          name: newScreen,
          changeTime: new Date(),
        },
      };
    }
    default: {
      return state;
    }
  }
}
