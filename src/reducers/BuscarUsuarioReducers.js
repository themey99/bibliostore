import { BUSCAR_USUARIO } from '../actions/types';

const initialState = {};

export default function BuscarUsuarioReducers(state = initialState, action) {
  switch(action.type) {
    case BUSCAR_USUARIO:
      return {
        ...state,
        nombre : action.payload.nombre,
        apellido : action.payload.apellido,
        carrera : action.payload.carrera,
        codigo : action.payload.codigo,
      };
    default: 
      return state;
  }
}