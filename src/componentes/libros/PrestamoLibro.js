import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

import FichaSuscriptor from '../suscriptores/FichaSuscriptores';

/*================
* REDUX ACTIONS
==================*/
import {buscarUsuario} from '../../actions/BuscarUsuarioActions';

class PrestamoLibro extends Component {
  state = { 
    busqueda : '',
    noResultados : false
  }

  // Buscar alumno
  buscarAlumno = e => {
    e.preventDefault();
    // crear el dato a buscar
    const { busqueda } = this.state;

    // extraer firestore
    const { firestore, buscarUsuario } = this.props;

    // hacer consulta
    const colleccion = firestore.collection('suscriptores');
    const consulta = colleccion.where('codigo', '==', busqueda).get();

    // leer resultados
    consulta.then(resultado => {
      if(resultado.empty) {
        // no hay resultados

        // almacenar en redux un objeto vacio
        buscarUsuario({});

        this.setState({
          noResultados : true
        })
      }else{
        // si hay resultados

        // colocar el resultado en el state de redux
        const datos = resultado.docs[0];
        buscarUsuario(datos.data());

        // Actualizar el state si hay resultados
        this.setState({
          noResultados : false
        })
      }
    });
  }

  // Almacena los datos del alumno para solicitar el prestamo
  solicitarPrestamo = () => {
    const suscriptor = this.props.resultado;

    // fecha de alta 
    suscriptor.fecha_solicitud = new Date().toLocaleDateString();

    // Obtener el Libro
    const {libro} = this.props;

    // Agregar el suscriptor al libro
    const libroActualizado = Object.assign({}, libro, {prestados : [...libro.prestados, suscriptor]})

    // obtener firestore y history de props
    const {firestore, history} = this.props;

    // almacenar en la BD
    firestore.update({
      collection: 'libros',
      doc: libro.id,
    }, libroActualizado)
    .then(() => history.push(`/libros/mostrar/${libro.id}`));
  }

  // Extraer los valores del input
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    // Extraer el Libro
    const {libro, resultado} = this.props;
    // Mostrar spinner
    if(!libro) return <Spinner />;

    // Extraer los datos del alumno para mostrarlo
    const { noResultados } = this.state;

    let fichaAlumno, btnSolicitar;

    if(resultado.nombre) {
      fichaAlumno = <FichaSuscriptor
                      alumno={resultado}
                    />
      btnSolicitar = <button
                      type="button"
                      className="btn btn-success btn-block"
                      onClick={this.solicitarPrestamo}
                      >Solicitar Prestamo</button>;
    }else{
      fichaAlumno = null;
      btnSolicitar = null;
    }

    // Mostrar mensaje de error
    let mensajeResultado = '';
    if (noResultados) {
      mensajeResultado = <div className="alert alert-danger text-center font-weight-bold">No hay resultado para este código</div>;
    }else{
      mensajeResultado = null;
    }

    return ( 
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={`/libros/mostrar/${libro.id}`} className="btn btn-secondary">
            <FontAwesomeIcon icon="arrow-circle-left" />
            Volver a Los Datos del Libro
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <FontAwesomeIcon icon="book" />{' '}
            Solicitar Prestamo: {libro.titulo}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form
                onSubmit={this.buscarAlumno}
                className="mb-4"
              >
                <legend className="color-primary text-center">
                  Busca el Suscriptor por Código
                </legend>
                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                    value={this.busqueda}
                  />
                </div>
                <input
                  type="submit"
                  value="Buscar Alumno"
                  className="btn btn-success btn-block"
                />
              </form>
              {/* MUESTRA LA FICHA DEL ALUMNO Y EL BOTÓN PARA SOLICITAR PRESTAMO */}
              {fichaAlumno}
              {btnSolicitar}

              {/* MUESTRA UN MENSAJE DE NO RESULTADO */}
              {mensajeResultado}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
 firestore : PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection : 'libros',
    storeAs : 'libro',
    doc : props.match.params.id
  }]),
  connect(({firestore: {ordered}, usuario}, props) => ({
    libro : ordered.libro && ordered.libro[0],
    resultado : usuario,
  }), { buscarUsuario })
)(PrestamoLibro);