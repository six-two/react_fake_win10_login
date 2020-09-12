import { timeout, TimeoutError } from 'promise-timeout';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';

const SLEEP_TIME = 1000;

export async function isLoginValid(state: ReduxState) {
  let username = state.var.login.username;
  let password = state.var.login.password;
  let url = state.const.checkLoginCredentialsUrl;
  let timeout = state.const.serverRequestTimeout;

  if (url !== null) {
    // query the url to check password
    let serverResponse = await resolveWithTimeout(
      checkCredentialsViaServer(url, username, password), timeout);
    if (serverResponse !== null) {
      // got a valid server response
      return serverResponse;
    }
  } else {
    // simulete the check time by just waiting a bit
    await sleep(SLEEP_TIME);
  }
  // use regexes to check validity
  let validUsername = Boolean(username.match(state.const.validLoginUsernameRegex));
  let validPassword = Boolean(password.match(state.const.validLoginPasswordRegex));
  console.log(`Comparing login credentials to regex.\n - validUsername: ${validUsername}\n - validPassword: ${validPassword}`);
  return validUsername && validPassword;
}

export async function isDecryptPasswordValid(state: ReduxState) {
  let password = state.var.decrypt.password;
  let url = state.const.checkDecryptionPasswordUrl;
  let timeout = state.const.serverRequestTimeout;

  if (url !== null) {
    // query the url to check password
    let serverResponse = await resolveWithTimeout(
      checkCredentialsViaServer(url, null, password), timeout);
    if (serverResponse !== null) {
      // got a valid server response
      return serverResponse;
    }
  } else {
    // simulete the check time by just waiting a bit
    await sleep(SLEEP_TIME);
  }
  // use regex to check validity
  let validPassword = Boolean(password.match(state.const.validDecryptionPasswordRegex));
  console.log(`Comparing decrypt password to regex. Match: ${validPassword}`);
  return validPassword;
}

async function resolveWithTimeout(promise: Promise<boolean | null>, timeoutSeconds?: number) {
  try {
    if (timeoutSeconds && timeoutSeconds > 0) {
      let timeoutMillis = Math.round(timeoutSeconds * 1000);
      return await timeout(promise, timeoutMillis);
    } else {
      return await promise;
    }
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.info(`Promise timed out after ${timeoutSeconds} seconds`);
    } else {
      console.error("Promise resulted in error:", err);
    }
    return null;
  }
}

async function checkCredentialsViaServer(urlTemplate: string, username: string | null,
  password: string): Promise<boolean | null> {
  let url = urlTemplate.replace(C.PLACEHOLDER_PASSWORD, password);
  if (username !== null) {
    url = url.replace(C.PLACEHOLDER_USERNAME, username);
  }

  console.log(`Checking credentials via url: "${url}"`)
  let response = await http<VerifyCredentialsResponse>(url);

  const isValid = response && response.isValid !== undefined ? response.isValid : null;
  console.log("Server response:", isValid);
  return isValid;
}

async function http<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP request failed: url="${url}" response_status: "${response.statusText}"`);
      return null;
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface VerifyCredentialsResponse {
  isValid: boolean,
}
