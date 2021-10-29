import React, { Component } from "react";
import Global from "../../../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class DetallePersonajes extends Component {
  state = {
    personajes: {},
    status: false,
  };

  cargarPersonajes = () => {
    var request = "api/Series/PersonajesSerie/" + this.props.idSerie;
    var url = Global.urlseries + request;
    console.log(url);

    axios.get(url).then((res) => {
      this.setState({
        personajes: res.data,
        status: true,
      });
      console.log(this.state);
      console.log(this.props);
    });
  };

  componentDidMount = () => {
    this.cargarPersonajes();
  };

  render() {
    return (
      <div className="container">
        <NavLink
          to={"/DetallesSeries/" + this.props.idSerie}
          className="btn btn-success"
        >
          Volver
        </NavLink>

        {this.state.status == true ? (
          <table border="2" class="table table-dark table-hover">
            <thead>
              <tr>
                <th>Personaje</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personajes.map((per, serie) => {
                return (
                  <tr>
                    <td>{per.nombre}</td>
                    <td>
                      <img
                        src={per.imagen}
                        style={{ width: "100px", height: "100px" }}
                      ></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>Loading data...</h1>
        )}
      </div>
    );
  }
}
