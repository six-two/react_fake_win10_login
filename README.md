# Fake Windows 10 Login

A small web app that emulates the login screen of Windows 10. You can use it to steal someones credentials.
Or even better: Leave you laptop open with this page and use the webcam to find out who messes with your computer. Or do whatever crazy stuff you can think of.

## Make your own version

1. Download the code: `git clone https://github.com/six-two/react_fake_win10_login`
2. Make your changes
3. Test your site localy: `npm start` or `./run.sh` 
4. Set the `homepage` value in `package.json` to the URL where you will host the page.
    If you want to use GitHub Pages, use `http://<username>.github.io/<repository_name>`
5. Deploy the site:
   - With GitHub Pages: Just run `npm run deploy`
   - Other: Run `npm run build` and then upload the `public/` folder

## Credential verification

Credentials can be either checked in browser (via a regex) or can be sent to a remote server.
If you want to use the remote server option, check out my [credential server example](https://github.com/six-two/fake_login_server_example).

## Background images

Because there might be licensing issues, I **do not** upload / host any original Windows background images.
If you want to use one of the original backgrounds:

1. Log in to a Windows 10 computer. If you don't have one, install Windows 10 in a VM or go to a library.
2. Open a file manager (like Explorer) and go to `C:\Windows\Web\Screen`
3. Find the image you want to use
4. Upload that image (on your own server, or using a service like [postimage](https://postimages.org/)).

    *Important: You need to specify the direct link to the real image file, not just to a page showing the image.*
    If you are using *postimage*, use the `Direct link` value.
5. Copy and paste the image URL into the `Background image URL` field on the [setup page](https://15c.me/w10) and click `Start`

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
