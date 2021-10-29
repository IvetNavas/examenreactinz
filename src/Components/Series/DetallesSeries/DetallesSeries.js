import React, { Component } from "react";
import Global from "../../../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class DetalleEquipo extends Component {
  state = {
    serie: {},
    status: false,
  };

  cargarDetalle = () => {
    var request = "api/Series/" + this.props.idSerie;
    var url = Global.urlseries + request;
    console.log(url);
    axios.get(url).then((res) => {
      this.setState({
        serie: res.data,
        status: true,
      });
      console.log(res.data);
    });
  };

  componentDidMount = () => {
    this.cargarDetalle();
  };

  componentDidUpdate = (oldProps) => {
    if (oldProps != this.props) {
      this.cargarDetalle();
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "100px" }}
      >
        {this.state.status == true ? (
          <div className="card">
            <img
              src={this.state.serie.imagen}
              style={{
                height: "400px",
                width: "500px",
                margin: "auto",
                marginTop: "50px",
              }}
            ></img>
            <div className="card-body ">
              <h1 className="card-title">{this.state.serie.nombre}</h1>
              <h5 className="card-title">
                IMDB: {this.state.serie.puntuacion}
              </h5>

              <NavLink
                to={"/DetallesPersonajes/" + this.state.serie.idSerie}
                className="btn btn-success"
              >
                personajes
              </NavLink>
            </div>
          </div>
        ) : (
          <h1>Loading data....</h1>
        )}
      </div>
    );
  }
}
