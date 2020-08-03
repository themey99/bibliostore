import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Suscriptores = ({suscriptores, firestore}) => {
  if(!suscriptores) return <Spinner />;

  // Eliminar Suscriptores
  const eliminarSuscriptor = id => {
    firestore.delete({
      collection : 'suscriptores',
      doc : id
    })
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10">
        <h2>
          <FontAwesomeIcon icon="users" /> Suscriptores
        </h2>
      </div>
      <div className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mt-md-2">
        <Link
          to={'/suscriptores/nuevo'}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon="plus"/>{' '}
          Nuevo Suscriptor
        </Link>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>{suscriptor.nombre} {suscriptor.apellido}</td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-success btn-block"
                >
                  <FontAwesomeIcon icon="angle-double-right" />
                  {' '}Mas información
                </Link>

                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => eliminarSuscriptor(suscriptor.id)}
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

Suscriptores.propTypes = {
  firestore : PropTypes.object.isRequired,
  suscriptores : PropTypes.array
}

export default compose(
  firestoreConnect([{collection: 'suscriptores'}]),
  connect((state, props) => ({
    suscriptores : state.firestore.ordered.suscriptores
  }))
)(Suscriptores)