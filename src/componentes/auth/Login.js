import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseConnect } from 'react-redux-firebase';
import Proptypes from 'prop-types';

class Login extends Component {
  state = { 
    email: '',
    password: ''
  }

  // Extraer los valores del input
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  // inicia sesion en firebase
  iniciarSesion = e => {
    e.preventDefault();

    // extraer firebase
    const { firebase } = this.props;

    // extraer el state
    const { email, password } = this.state;
  
    // autenticar el usuario
    firebase.login({
      email,
      password
    })
    .then(resultado => console.log('iniciaste Sesión'))
    .catch(error => console.log('hubo un error'))
  }

  render() { 
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <FontAwesomeIcon icon="lock" />{' '}
                Iniciar Sesión
              </h2>
              <form
                onSubmit={this.iniciarSesion}
              >
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.leerDato}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Iniciar Sesión"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  firebase : Proptypes.object.isRequired,
}

export default firebaseConnect()(Login);