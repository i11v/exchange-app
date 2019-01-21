import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";
import ExchangeAppContainer from "./containers/ExchangeAppContainer";
import enMessages from "./i18n/en-us";

const store = configureStore();
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  
  body {
    font: normal 16px/1.5 "Helvetica Neue", Arial, sans-serif;
  }
`;

addLocaleData([...en]);

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <IntlProvider locale="en" messages={enMessages}>
      <Provider store={store}>
        <ExchangeAppContainer />
      </Provider>
    </IntlProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
