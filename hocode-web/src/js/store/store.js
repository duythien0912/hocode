// import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import vietnameseMessages from "ra-language-vietnamese";
// import defaultMessages from 'ra-language-english';
import {
  adminReducer,
  adminSaga,
  formMiddleware,
  defaultI18nProvider,
  USER_LOGOUT,
  i18nReducer
} from "react-admin";
import { routerMiddleware, routerReducer } from "react-router-redux";
// in src/createAdminStore.js
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import thunk from "redux-thunk";
import authProvider from "../../components/adminPage/hocode/auth/authProvider";
import dataProvider from "../../components/adminPage/hocode/dataProvider";
import rootReducer from "../reducers";

import routeReducer2 from '../reducers/routeReducer';

const initialState = {};

const history = createBrowserHistory();

const createAdminStore = ({
  authProvider,
  dataProvider,
  i18nProvider = defaultI18nProvider,
  history,
  locale = "vi"
}) => {
  const reducer = combineReducers({
    admin: adminReducer,
    form: formReducer,
    router: routerReducer,
    i18n: i18nReducer(locale, i18nProvider(locale)),
    rootReducer: rootReducer
    // { /* add your own reducers here */ },
  });
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider, i18nProvider)
        // add your own sagas here
      ].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    resettableAppReducer,
    // { /* set your initial state here */ },
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        formMiddleware,
        routerMiddleware(history),
        thunk
        // add your own middlewares here
      ),
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
      // add your own enhancers here
    )
  );
  sagaMiddleware.run(saga);
  return store;
};


const i18nProvider = locale => {
  // if (locale !== 'en') {
  //     return messages[locale];
  // }
  return vietnameseMessages;
};

const store = createAdminStore({
  authProvider,
  dataProvider,
  i18nProvider,
  history
});
export default store;

export { history };
// const middleware = [thunk];
// //const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware)
//  // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //cai nay su dung khi dung redux dev tool extension
//   )
// );

// export { store};
