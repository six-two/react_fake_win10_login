import React from 'react';
import * as C from '../redux/constants';

export interface RenderInputProps {
  value: string,
  setValue: (value: string) => void,
}

export function allowsEmptyInput(type: string): boolean {
  if (type === C.TYPE_STRING_OR_NULL || type === C.TYPE_TIMEOUT_OR_NULL
    || type === C.TYPE_TEMPLATE_URL_PASS || type === C.TYPE_TEMPLATE_URL_USER_PASS) {
    return true;
  }
  return false;
}

export function renderInput(type: string, defaultValue: string,
  value: string, onValueChange: (value: string) => void): JSX.Element {
  switch (type) {
    case C.TYPE_REGEX:
    case C.TYPE_STRING:
    case C.TYPE_STRING_OR_NULL:
    case C.TYPE_TIMEOUT:
    case C.TYPE_TIMEOUT_OR_NULL:
    case C.TYPE_TEMPLATE_URL_PASS:
    case C.TYPE_TEMPLATE_URL_USER_PASS: {
      return <input
        value={value}
        onChange={e => onValueChange(e.target.value)}
        placeholder={defaultValue} />
    }
    case C.TYPE_USERNAMES_AND_ICONS: {
      return <textarea
        value={value}
        onChange={e => onValueChange(e.target.value)}
        placeholder={defaultValue}
        cols={50}
        rows={5} />
    }
    default:
      console.error(`Unknown type: "${type}"`)
      return <div>ERROR: Unknown input type</div>;
  }
}

export function checkInput(type: string, value: string): string | null {
  if (!allowsEmptyInput(type) && !value) {
    return "Empty field is not allowed";
  }
  switch (type) {
    case C.TYPE_STRING:
    case C.TYPE_STRING_OR_NULL: {
      return null;
    }
    case C.TYPE_TIMEOUT_OR_NULL:
    case C.TYPE_TIMEOUT: {
      if (type === C.TYPE_TIMEOUT_OR_NULL && !value) {
        return null;
      }
      return checkTimingStringForErrors(value);
    }
    case C.TYPE_TEMPLATE_URL_PASS:
    case C.TYPE_TEMPLATE_URL_USER_PASS: {
      let placeholders = [C.PLACEHOLDER_PASSWORD];
      if (type === C.TYPE_TEMPLATE_URL_USER_PASS) {
        placeholders.push(C.PLACEHOLDER_USERNAME);
      }
      return checkUrlForPlaceholders(value, placeholders);
    }
    case C.TYPE_REGEX: {
      return checkRegex(value);
    }
    case C.TYPE_USERNAMES_AND_ICONS:
      return checkUserList(value);
    default:
      console.error(`Unknown type: "${type}"`)
      return "Internal error: unknown type";
  }
}

function checkUserList(value: string): string | null {
  value = value.trimEnd(); // remove trailing \n
  if (value) {
    for (const line of value.split('\n')) {
      // console.log(`line: "${line}"`);
      if (!line) {
        return 'This field contains an empty line';
      }
    }
    return null;
  } else {
    return 'You need to specify at least one user';
  }
}

function checkTimingStringForErrors(value: string): string | null {
  let number = Number(value);
  if (isNaN(number)) {
    return "Not a valid number";
  }
  if (number < 0) {
    return "Number can not be negative";
  }
  return null;
}

function checkUrlForPlaceholders(urlText: string, placeholders: string[]) {
  try {
    new URL(urlText);
  } catch (e) {
    // console.debug("This error is probably related to url parsing", e);
    return "Unvalid URL format";
  }

  for (let p of placeholders) {
    if (urlText.indexOf(p) < 0) {
      return `The url should contain the placeholder "${p}"`;
    }
  }
  return null;
}

function checkRegex(value: string): string | null {
  try {
    new RegExp(value);
    return null;
  } catch (e) {
    return "Not a valid regular expression";
  }
}
