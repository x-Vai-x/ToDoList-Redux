import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import CompleteFilterDropdown from "./components/partials/CompleteFilterDropdown";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <div>
          <Switch>
            <Route exact path="/" component={CompleteFilterDropdown} />
          </Switch>
        </div>
      </Switch>
    </Provider>
  );
}

export default App;
