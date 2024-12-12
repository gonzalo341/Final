import promptSync from 'prompt-sync';
import { Biblioteca, Usuario, Libro } from './clases_1.js';

const prompt = promptSync();
let biblioteca = new Biblioteca();

// Agregar un libro "Matematica 1" de Gonzalo con 5 copias
const libroMatematica = new Libro("Matematica 1", "Gonzalo", 5);
biblioteca.libros.push(libroMatematica);

// Agregar un usuario ya registrado para prueba del inicio de seción
const usuarioDePrueba = new Usuario("Gonzalo", "hola");
biblioteca.usuarios.push(usuarioDePrueba);

let ciclo = true;

const categoria = prompt('Buen día. ¿A qué categoría pertenece? \n1) Cliente \n2) Bibliotecario \n3) Salir \n');

while (ciclo) {

    switch (categoria) {
        case '1':  // Cliente
            const accionCliente = prompt('¿Desea iniciar sesión o registrarse? \n1) Iniciar sesión \n2) Registrarse \n3) Salir \n');
            let usuarioActual = null;

            switch (accionCliente) {
                case '1':
                    usuarioActual = usuarioDePrueba.iniciarSesion(biblioteca.usuarios);
                    if (usuarioActual) {
                        const accionClientePostLogin = prompt('¿Qué desea hacer? \n1) Pedir libro directamente \n2) Buscar libro y pedirlo \n3) Salir \n');
                        switch (accionClientePostLogin) {
                            case '1':
                                biblioteca.pedirLibroDirectamente(usuarioDePrueba);
                                break;
                            case '2':
                                biblioteca.pedirLibroConBusqueda();
                                break;
                            case '3':
                                ciclo = false;
                                break;
                            default:
                                console.log('Opción no válida');
                        }
                    }
                    break;
                case '2':
                    Usuario.crearCuenta(biblioteca.usuarios);
                    break;
                case '3':
                    console.log(`${usuarioDePrueba.nombre} ha pedido: ${usuarioDePrueba.librosPedidos}`)
                    ciclo = false;
                    break;
                default:
                    console.log('Opción no válida');
            }
            break;

        case '2':  // Bibliotecario
            const accionBibliotecario = prompt('¿Qué desea hacer? \n1) Agregar libro \n2) Eliminar libro \n3) Salir \n');
            switch (accionBibliotecario) {
                case '1':
                    biblioteca.agregarLibro();
                    break;
                case '2':
                    biblioteca.eliminarLibro();
                    break;
                case '3':
                    ciclo = false;
                    break;
                default:
                    console.log('Opción no válida');
            }
            break;

        case '3':  // Salir
     
            ciclo = false;
            break;

        default:
            console.log('Opción no válida');
    }
}
