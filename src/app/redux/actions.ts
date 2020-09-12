//Needs to be here to prevent cyclic references
import store, { ReduxConstants } from './store';
import * as C from './constants';

function d(action: Action) {
  store.dispatch(action);
}

export interface Action {
  type: string,
  payload?: string | number | boolean | SetKernelAndBootPayload | ReduxConstants | null,
};

export interface SetKernelAndBootPayload {
  title: string,
  kernel: string,
}

// action creators
export function requestFullscreen(newValue: boolean) {
  d({
    type: C.SET_FULLSCREEN_IS_REQUESTED,
    payload: newValue,
  });
}

export function setIsFullscreenActive(newValue: boolean) {
  d({
    type: C.SET_FULLSCREEN_IS_ACTIVE,
    payload: newValue,
  });
}

export function setLoginUsername(newValue: string) {
  d({
    type: C.SET_LOGIN_USERNAME,
    payload: newValue,
  });
}

export function setLoginPassword(newValue: string) {
  d({
    type: C.SET_LOGIN_PASSWORD,
    payload: newValue,
  });
}

export function tryLogin(success: boolean) {
  d({
    type: C.TRY_LOGIN,
    payload: success,
  });
}

export function setLoginOpenMenu(newValue: string | null) {
  d({
    type: C.SET_LOGIN_OPEN_MENU,
    payload: newValue,
  });
}

export function setHostname(newValue: string) {
  d({
    type: C.SET_HOSTNAME,
    payload: newValue,
  });
}

export function setScreen(newValue: string) {
  d({
    type: C.SET_SCREEN,
    payload: newValue,
  });
}

export function setGrubMainSelectedIndex(newValue: number) {
  d({
    type: C.SET_GRUB_MAIN_SELECTED,
    payload: newValue,
  });
}

export function setGrubAdvancedSelectedIndex(newValue: number) {
  d({
    type: C.SET_GRUB_ADVANCED_SELECTED,
    payload: newValue,
  });
}

export function setKernelAndBoot(entryName: string, kernelName: string) {
  d({
    type: C.SET_KERNEL_AND_BOOT,
    payload: { title: entryName, kernel: kernelName },
  });
}

export function setDecryptPassword(newValue: string) {
  d({
    type: C.SET_DECRYPT_PASSWORD,
    payload: newValue,
  });
}

export function tryDecrypt(success: boolean) {
  d({
    type: C.TRY_DECRYPT,
    payload: success,
  });
}

export function initialSetup(constants: ReduxConstants) {
  document.title = constants.coverFakeTitle;
  window.history.pushState({ stage: "simulation" }, "", constants.coverFakeUrl);

  d({
    type: C.INITIAL_SETUP,
    payload: constants,
  });
}

export function resetState() {
  d({ type: C.RESET_STATE });
}

export function onHistoryPopState(setupIsDone: boolean) {
  d({ type: C.SET_SETUP_DONE, payload: setupIsDone });
}
