import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import { store } from './app/redux/store';
import { onHistoryPopState } from './app/redux/actions';

window.addEventListener('popstate', (event) => {
  if (!event.state || !event.state.stage) {
    //Go to setup
    onHistoryPopState(false);
  } else {
    // go to simulation
    onHistoryPopState(true);
  }
  console.log("[Event: popstate] state: " + JSON.stringify(event.state));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
