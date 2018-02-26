import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/index.jsx';
import App from './components/app.jsx';

// const store = createStore(allReducers);
// console.log('this is what store looks like!', store.getState());

ReactDOM.render(
  // got rid of provider cause we're sticking with the vanilla react at the moment
  // <Provider store={store}>
  <App />,
  // </Provider>,
  document.getElementById('app'),
);
