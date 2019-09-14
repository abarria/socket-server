import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }

    // AGREGAR UN USUARIO
    public agregar(usuario: Usuario) {


        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;

    }


    public actualizarNombre(id: string, nombre: string) {

        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('===== Actualizando usuario =====');
        console.log(this.lista);

    }

    //OBTENER LISTA DE USUARIOS
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' )
    }

    //OBTENER UN USUARIO
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // obtener usuarios de una sala
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // BORRAR USUARIO
    public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
    }



}