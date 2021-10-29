import React, { Component } from "react";
import Global from "../../../Global";
import axios from "axios";
import { Redirect } from "react-router";

export default class NuevoPersonaje extends Component {
  cajaPersonajeRef = React.createRef();
  cajaimaRef = React.createRef();
  cajaserieRef = React.createRef();

  state = {
    mensaje: "",
    status: false,
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

  insertarPersonaje = (e) => {
    e.preventDefault();
    var per = this.cajaPersonajeRef.current.value;
    var img = this.cajaimaRef.current.value;
    var ser = parseInt(this.cajaserieRef.current.value);
    console.log("soy el id:" + ser);
    var personaje = {
      nombre: per,
      imagen: img,
      idSerie: ser,
    };

    console.log(personaje);
    var request = "api/Personajes";
    var url = Global.urlseries + request;

    console.log(url);
    axios.post(url, personaje).then((res) => {
      this.setState({
        mensaje: "Insertado correctamente",
        status: true,
      });
    });
  };

  render() {
    if (this.state.status == true) {
      return (
        // <Redirect to={"/DetallesPersonajes/ " + this.state.series.idSerie} />
        <Redirect to={"/Home"} />
      );
    }
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Nueva Personaje</h1>
        <form
          style={{ width: "500px", display: "table", margin: "0 auto" }}
          onSubmit={this.insertarPersonaje}
        >
          <div className="form-group row">
            <label>Personaje: </label>
            <input
              type="text"
              className="form-control"
              ref={this.cajaPersonajeRef}
            />
          </div>
          <div className="form-group row">
            <label>Imagen: </label>
            <input type="text" className="form-control" ref={this.cajaimaRef} />
          </div>
          <div className="form-group row">
            <label>Serie: </label>

            <select className="form-control" ref={this.cajaserieRef}>
              {this.state.series.map((ser, index) => {
                return (
                  <option key={index} value={ser.idSerie}>
                    {" "}
                    {ser.idSerie} {ser.nombre}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-info">Insertar Personaje</button>
        </form>
      </div>
    );
  }
}
