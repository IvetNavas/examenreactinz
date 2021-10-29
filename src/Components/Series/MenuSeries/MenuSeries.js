import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Global from "../../../Global";
import axios from "axios";

export default class MenuSeries extends Component {
  state = {
    series: [],
  };
  cargarSeries = () => {
    var url = Global.urlseries;
    var request = "api/Series";
    axios.get(url + request).then((res) => {
      this.setState({
        series: res.data,
      });
      console.log(res.data);
    });
  };
  componentDidMount = () => {
    this.cargarSeries();
  };

  render() {
    return (
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        {/* <!-- Brand --> */}
        <a class="navbar-brand" href="#">
          Series
        </a>

        {/* <!-- Links --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/Home">
              Home
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              className="nav-link active"
              aria-current="page"
              to="/NuevoPersonaje"
            >
              Nuevo personaje
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              className="nav-link active"
              aria-current="page"
              to="/ModificarPersonaje"
            >
              Modificar personaje
            </NavLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown08"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Series
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdown08">
              {this.state.series.map((ser, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="dropdown-item"
                      to={"/DetallesSeries/" + ser.idSerie}
                    >
                      {ser.nombre}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}
