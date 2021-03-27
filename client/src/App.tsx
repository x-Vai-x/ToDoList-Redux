import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import ItemsPage from "./pages/ItemsPage";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <div>
          <Switch>
            <Route exact path="/" component={ItemsPage} />
          </Switch>
        </div>
      </Switch>
    </Provider>
  );
}

export default App;
