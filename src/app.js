import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/Home'
import Professors from './components/Professors'
import Professor from './components/Professor'
import Disciplines from "./components/Disciplines";
import Discipline from "./components/Discipline";
import AddTest from './components/AddTests'

export default function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/professors" exact>
              <Professors />
            </Route>
            <Route path="/professor/:id" exact>
              <Professor />
            </Route>
            <Route path="/disciplines" exact>
              <Disciplines />
            </Route>
            <Route path="/discipline/:id" exact>
              <Discipline />
            </Route>
            <Route path="/insert" exact>
              <AddTest />
            </Route>
        </Switch>
    </BrowserRouter>
  );
}