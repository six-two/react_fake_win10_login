import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    // case C.SET_LOGIN_USERNAME: {
    //   let payload = action.payload as string;
    //   return {
    //     ...state,
    //     login: {
    //       ...state.login,
    //       username: payload,
    //     },
    //   };
    // }
    default:
      return state;
  }
}
