import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );
}

export const desconectar = (cliente: Socket) =>
    cliente.on('disconnect', () => {
        console.log('Cliente DESCONECTADO');
        usuariosConectados.borrarUsuario( cliente.id );
    });
}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);


    });
    


}

//CONFIGURAR USUARIO
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {


        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );


        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        })

    });
    


}