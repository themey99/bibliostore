import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditarLibro extends Component {
  // refs
  tituloInput = React.createRef();
  ISBNInput = React.createRef();
  editorialInput = React.createRef();
  existenciaInput = React.createRef();

  // editar el libro en la base de datos
  editarLibro = e => {
    e.preventDefault();
    // Crear el objeto a actualizar
    const libroActualizado = {
      titulo : this.tituloInput.current.value,
      ISBN : this.ISBNInput.current.value,
      editorial : this.editorialInput.current.value,
      existencia : this.existenciaInput.current.value,
    }
    // extraer firestore e history de props
    const { libro, firestore, history } = this.props;

    // Almacenar en la base de datos con firestore
    firestore.update({
      collection : 'libros',
      doc : libro.id
    }, libroActualizado)
    .then(() => history.push('/'));
  }

  render() {
    const {libro} = this.props;
    if(!libro) return <Spinner />;

    return ( 
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/'} className="btn btn-secondary">
            <FontAwesomeIcon icon="arrow-circle-left" />
            Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <FontAwesomeIcon icon="book" />{' '}
            Editar Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarLibro}>
              <div className="form-group">
                  <label>Título: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título o Nombre del Libro"
                    required
                    defaultValue={libro.titulo}
                    ref={this.tituloInput}
                  />
                </div>
                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del Libro"
                    required
                    defaultValue={libro.editorial}
                    ref={this.editorialInput}
                  />
                </div>
                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del Libro"
                    required
                    defaultValue={libro.ISBN}
                    ref={this.ISBNInput}
                  />
                </div>
                <div className="form-group">
                  <label>Existencia: </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="Cantidad existente del Libro"
                    required
                    defaultValue={libro.existencia}
                    ref={this.existenciaInput}
                  />
                </div>
                <input
                  type="submit"
                  value="Agregar Libro"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
     );
  }
}

EditarLibro.propTypes = {
 firestore : PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection : 'libros',
    storeAs : 'libro',
    doc : props.match.params.id
  }]),
  connect(({firestore: {ordered}}, props) => ({
    libro : ordered.libro && ordered.libro[0]
  }))
)(EditarLibro);
