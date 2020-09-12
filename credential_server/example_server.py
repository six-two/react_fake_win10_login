#!/usr/bin/env python3
# Based on code from: https://gist.github.com/nitaku/10d0662536f37a087e1b

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import traceback

DEFAULT_IS_VALID = False
USERNAME_PARAM = 'u'
PASSWORD_PARAM = 'p'
DISK_PATH = "/disk.json"
LOGIN_PATH = "/login.json"


def isValidDiskPassword(password):
    if not password:
        return False
    return password == 'ok'


def isValidLogin(username, password):
    print('Attempted login as "{}" with password "{}"'.format(username, password))
    if not username or not password:
        return False
    if username == 'a':
        return True
    if 'o' in password:
        return True
    return False


class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        isValid = DEFAULT_IS_VALID
        print("\nGot request:", self.path)
        try:
            parsed = urlparse(self.path)
            args = parse_qs(parsed.query)
            def getArg(name):
                try:
                    return args[name][0]
                except:
                    print('Missing url parameter: "{}"'.format(name))
                    return ''

            if parsed.path.endswith(DISK_PATH):
                isValid = isValidDiskPassword(getArg(PASSWORD_PARAM))
            elif parsed.path.endswith(LOGIN_PATH):
                isValid = isValidLogin(getArg(USERNAME_PARAM), getArg(PASSWORD_PARAM))
            else:
                print("Error: Unknown request type")
        except:
            traceback.print_exc()

        print("Sending response: isValid={}".format(isValid))
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'isValid': isValid}).encode("utf-8"))


def run(server_class=HTTPServer, host='localhost', port=3333):
    host = 'localhost'
    httpd = server_class((host, port), Server)

    print('Starting httpd on port %d...' % port)

    print('\nURL for disk password check:')
    print('http://{}:{}{}?{}=<password>'.format(host, port, DISK_PATH, PASSWORD_PARAM))

    print('\nURL for login credentials check:')
    print('http://{}:{}{}?{}=<username>&{}=<password>'.format(host, port, LOGIN_PATH, USERNAME_PARAM, PASSWORD_PARAM))

    print('\n\nWaiting for requests...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Ctrl-C: Shutting down...")


if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    if len(argv) == 3:
        run(host=argv[1], port=int(argv[2]))
    else:
        run()
