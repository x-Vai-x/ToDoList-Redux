import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CompleteFilterDropdown from "./components/partials/CompleteFilterDropdown";

function App() {
  return (
    <Switch>
      <div>
        <Switch>
          <Route exact path="/" component={CompleteFilterDropdown} />
        </Switch>
      </div>
    </Switch>
  );
}

export default App;
