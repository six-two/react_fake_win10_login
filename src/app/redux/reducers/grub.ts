import * as Actions from '../actions';
import * as C from '../constants';
import { ReduxVariables } from '../store';


export default function reducer(state: ReduxVariables, action: Actions.Action): ReduxVariables {
  switch (action.type) {
    case C.SET_GRUB_MAIN_SELECTED: {
      let payload = action.payload as number;
      return {
        ...state,
        grub: {
          ...state.grub,
          selectionInMain: payload,
          showTimeout: false,
        },
      };
    }
    case C.SET_GRUB_ADVANCED_SELECTED: {
      let payload = action.payload as number;
      return {
        ...state,
        grub: {
          ...state.grub,
          selectionInAdvanced: payload,
          showTimeout: false,
        },
      };
    }
    case C.SET_KERNEL_AND_BOOT: {
      let payload = action.payload as Actions.SetKernelAndBootPayload;
      if (!payload){
        console.error("Payload is not SetKernelAndBootPayload");
        return state;
      }
      return {
        ...state,
        grub: {
          ...state.grub,
          kernel: payload.kernel,
          showTimeout: false,
          selectedEntryName: payload.title,
        },
        screen: {
          name: C.SCREEN_CONSOLE_BOOTING,
          changeTime: new Date(),
        },
      };
    }
    default: {
      return state;
    }
  }
}
