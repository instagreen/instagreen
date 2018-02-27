import Main from './components/main.jsx';
import App from './components/app.jsx';
import LogIn from './components/login.jsx';
import router from './clientRouter.jsx';

// *** please refer to ./clientRouter.jsx for dynamic component rendering
router.setup({
  main: Main,
  app: App,
  login: LogIn,
});

router.setRoute('main');

// --------------------REDUX scraps --------------------
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import allReducers from './reducers/index.jsx';

// const store = createStore(allReducers);
// console.log('this is what store looks like!', store.getState());

// ReactDOM.render(
//   // got rid of provider cause we're sticking with the vanilla react at the moment
//   // <Provider store={store}>
//   <App />,
//   // </Provider>,
//   document.getElementById('app'),
// );

