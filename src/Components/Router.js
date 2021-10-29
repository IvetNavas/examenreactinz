import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DetallePersonajes from "./Series/DetallePersonajes/DetallePersonajes";
import DetallesSeries from "./Series/DetallesSeries/DetallesSeries";
import Home from "./Series/Home/Home";
import MenuSeries from "./Series/MenuSeries/MenuSeries";
import ModificarPersonaje from "./Series/ModificarPersonaje/ModificarPersonaje";
import NuevoPersonaje from "./Series/NuevoPersonaje/NuevoPersonaje";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <MenuSeries></MenuSeries>
        <Switch>
          <Route
            exact
            path="/DetallesSeries/:idSerie"
            render={(props) => {
              var idSerie = props.match.params.idSerie;
              return <DetallesSeries idSerie={idSerie} />;
            }}
          ></Route>
          <Route
            exact
            path="/DetallesPersonajes/:idSerie"
            render={(props) => {
              var idSerie = props.match.params.idSerie;
              return <DetallePersonajes idSerie={idSerie} />;
            }}
          ></Route>
          <Route
            exact
            path="/ModificarPersonaje"
            component={ModificarPersonaje}
          ></Route>
          <Route
            exact
            path="/NuevoPersonaje"
            component={NuevoPersonaje}
          ></Route>
          <Route exact path="/Home" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
