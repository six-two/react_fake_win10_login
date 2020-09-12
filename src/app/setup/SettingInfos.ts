import * as C from '../redux/constants';


export interface SettingsInfo {
  title: string,
  name: string,
  description: string,
  type: string,
}

const HOSTNAME: SettingsInfo = {
  title: "Hostname",
  name: "hostname",
  description: "The hostname of the Kali Linux. It is shown on the login screen.",
  type: C.TYPE_STRING,
};

const GRUB_GREETER_DURATION: SettingsInfo = {
  title: "Grub greeting message",
  name: "grubGreetingDuration",
  description: "Defines how long the 'Welcome to GRUB!' message is shown",
  type: C.TYPE_TIMEOUT,
};

const KERNEL_DURATION: SettingsInfo = {
  title: "Kernel load",
  name: "kernelLoadDuration",
  description: "Defines how long to wait after the 'Loading Linux <your_kernel_version_here> ...' line",
  type: C.TYPE_TIMEOUT,
};

const INITRD_DURATION: SettingsInfo = {
  title: "Initial ramdisk load",
  name: "initrdLoadDuration",
  description: "Defines how long to wait after the 'Loading initial ramdisk ...' line",
  type: C.TYPE_TIMEOUT,
};

const BOOT_LOGO_DURATION: SettingsInfo = {
  title: "Kali boot animation",
  name: "plymountDuration",
  description: "Determines how long the boot animation should be shown",
  type: C.TYPE_TIMEOUT,
};

const SHUTDOWN_LOGO_DURATIION: SettingsInfo = {
  title: "Kali logo during shutdown",
  name: "shutdownDuration",
  description: "Sets how long the kali logo is shown before the computer is shut down",
  type: C.TYPE_TIMEOUT,
};

const GRUB_TIMEOUT: SettingsInfo = {
  title: "Grub timeout",
  name: "bootTimeout",
  description: "If the user does not press a key after X seconds, the first boot menu entry gets executed automatically",
  type: C.TYPE_TIMEOUT_OR_NULL,
};

const CRYPT_DEVICE: SettingsInfo = {
  title: "Crypt device (root partition)",
  name: "cryptDevice",
  description: "The name of the encrypted partition. Setting this option will cause the decrypt disk screen to be shown",
  type: C.TYPE_STRING_OR_NULL,
};

const INITIAL_SCREEN: SettingsInfo = {
  title: "Initial screen",
  name: "initialScreen",
  description: "Select which state the computer should start in",
  type: C.TYPE_INITIAL_SCREEN,
};

const CHECK_DECRYPT_PASS_URL: SettingsInfo = {
  title: "Check disk password URL",
  name: "checkDecryptionPasswordUrl",
  description: "The URL to send a request to when the user tries to decrypt the disk",
  type: C.TYPE_TEMPLATE_URL_PASS,
};

const CHECK_LOGIN_URL: SettingsInfo = {
  title: "Check login URL",
  name: "checkLoginCredentialsUrl",
  description: "The URL to send a request to when the user tries to log in",
  type: C.TYPE_TEMPLATE_URL_USER_PASS,
};

const URL_VERIFICATION_TIMEOUT: SettingsInfo = {
  title: "Server verification timeout",
  name: "serverRequestTimeout",
  description: "How long to wait for a response from the server, before falling " +
    "back on the regular expression check. Setting the value too high can cause a visible delay " +
    "if the server is not reachable / responding",
  type: C.TYPE_TIMEOUT,
};

const REGEX_DECRYPT_PASSWORD: SettingsInfo = {
  title: "Decryption password",
  name: "validDecryptionPasswordRegex",
  description: "Accept the disk password if it matches this regular expression",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_USERNAME: SettingsInfo = {
  title: "Login username",
  name: "validLoginUsernameRegex",
  description: "Accept the login username if it matches this regular expression",
  type: C.TYPE_REGEX,
};

const REGEX_LOGIN_PASSWORD: SettingsInfo = {
  title: "Login password",
  name: "validLoginPasswordRegex",
  description: "Accept the login password if it matches this regular expression",
  type: C.TYPE_REGEX,
};


export const FIELDS_TIMING = [GRUB_GREETER_DURATION, KERNEL_DURATION,
  INITRD_DURATION, BOOT_LOGO_DURATION, SHUTDOWN_LOGO_DURATIION];
export const FIELDS_GENERAL = [HOSTNAME, INITIAL_SCREEN, GRUB_TIMEOUT, CRYPT_DEVICE];
export const FIELDS_CREDENTIAL_SERVER = [CHECK_DECRYPT_PASS_URL, CHECK_LOGIN_URL,
  URL_VERIFICATION_TIMEOUT];
export const FIELDS_CREDENTIAL_LOCAL = [REGEX_DECRYPT_PASSWORD, REGEX_LOGIN_USERNAME,
  REGEX_LOGIN_PASSWORD];

const ALL_SETTINGS = [...FIELDS_GENERAL, ...FIELDS_TIMING,
...FIELDS_CREDENTIAL_SERVER, ...FIELDS_CREDENTIAL_LOCAL];

export const SETTINGS_MAP = new Map<string, SettingsInfo>();
for (let s of ALL_SETTINGS) {
  SETTINGS_MAP.set(s.name, s);
}
