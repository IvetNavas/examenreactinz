import React, { Component } from "react";
import { Redirect } from "react-router";
import Global from "../../../Global";
import axios from "axios";

export default class ModificarPersonaje extends Component {
  serieRef = React.createRef();
  PersonajeRef = React.createRef();

  state = {
    series: [],
    personajes: [],
    status: false,
  };

  buscarSeries = () => {
    var request = "api/Series";
    // var idSeries = this.props.idSerie;
    var url = Global.urlseries + request;
    axios.get(url).then((res) => {
      this.setState({
        series: res.data,
      });
      console.log(res.data);
    });
  };
  buscarPersonas = () => {
    var request = "api/Personajes";
    // var id = this.props.idPersonaje;
    var url = Global.urlseries + request;
    axios.get(url).then((res) => {
      this.setState({
        personajes: res.data,
      });
      console.log(res.data);
    });
  };

  componentDidMount = () => {
    this.buscarSeries();
    this.buscarPersonas();
  };

  modificarPersonaje = (e) => {
    e.preventDefault();
    var IdSerie = parseInt(this.serieRef.current.value);
    var idPer = parseInt(this.PersonajeRef.current.value);

    console.log("perso id" + idPer);

    console.log("serie ide" + IdSerie);
    var personajes = {
      idSerie: IdSerie,
    };
    console.log(personajes);
    var request = "api/Personajes/" + idPer + "/" + IdSerie;
    var url = Global.urlseries + request;
    console.log(url);

    axios.put(url, personajes).then((res) => {
      this.setState({
        status: true,
      });
    });
  };

  mostrarSerie = () => {
    console.log("entre en serie");
    <div>
      <h1 style={{ color: "red" }}> {this.state.series.nombre}</h1>
      <img
        src={this.state.series.imagen}
        style={{ width: "200px", height: "200px" }}
      ></img>
    </div>;
  };
  mostrarPer = () => {
    console.log("entre en persso");
    <div>
      <h1 style={{ color: "blue" }}>{this.state.personajes.nombre}</h1>
      <img
        src={this.state.personajes.imagen}
        style={{ width: "200px", height: "200px" }}
      ></img>{" "}
    </div>;
  };

  render() {
    if (this.state.status == true) {
      return <Redirect to={"/Home"} />;
    }
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Personajes y series</h1>
        <form
          style={{ width: "500px", display: "table", margin: "0 auto" }}
          onSubmit={this.modificarPersonaje}
        >
          {/* PERSONAJE */}
          <div className="form-group row">
            <label>Personaje: </label>
            <select
              className="form-control"
              ref={this.PersonajeRef}
              onChange={this.mostrarPer}
            >
              {this.state.personajes.map((per, index) => {
                return (
                  <option key={index} value={per.idPersonaje}>
                    {" "}
                    {per.nombre}
                  </option>
                );
              })}
            </select>
          </div>

          {/* SERIE */}
          <div className="form-group row">
            <label>Serie: </label>
            <select
              className="form-control"
              ref={this.serieRef}
              onChange={this.mostrarSerie}
            >
              {this.state.series.map((ser, index) => {
                return (
                  <option key={index} value={ser.idSerie}>
                    {" "}
                    {ser.nombre}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-info">Modificar Personaje</button>
        </form>
      </div>
    );
  }
}
