import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Libros = ({libros, firestore}) => {
  const eliminarLibro = id => {
    firestore.delete({
      collection : 'libros',
      doc : id
    });
  }

  if(!libros) return <Spinner />;
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10">
        <h2>
          <FontAwesomeIcon icon="book" /> Libros
        </h2>
      </div>
      <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mt-md-2">
        <Link
          to={'/libros/nuevo'}
          className="btn btn-success"
        >
          <FontAwesomeIcon icon="plus" /> {' '}
          Nuevo Libro
        </Link>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Título</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencia</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.ISBN}</td>
              <td>{libro.editorial}</td>
              <td>{libro.existencia}</td>
              <td>{libro.existencia - libro.prestados.length}</td>
              <td>
                <Link
                  to={`/libros/mostrar/${libro.id}`}
                  className="btn btn-success btn-block"
                >
                  <FontAwesomeIcon icon="angle-double-right" />
                  {' '}Mas información
                </Link>

                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => eliminarLibro(libro.id)}
                >
                  <FontAwesomeIcon icon="trash-alt" />{' '}
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
Libros.propTypes = {
  firestore : PropTypes.object.isRequired,
  libros : PropTypes.array
}

export default compose(
  firestoreConnect([{collection: 'libros'}]),
  connect((state, props) => ({
    libros : state.firestore.ordered.libros
  }))
)(Libros)