import { BUSCAR_USUARIO } from './types';

export const buscarUsuario = (usuario) => ({
  type: BUSCAR_USUARIO,
  payload: usuario
})