import promptSync from 'prompt-sync';
const prompt = promptSync();

export class Libro {
    constructor(nombre, autor, cantidad) {
        this.nombre = nombre;
        this.autor = autor;
        this.cantidad = cantidad || 1; //si no tiene una cantidad especifica es entonces hay 1 libro
    }
}

export class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.librosPedidos = []
    }

    // Crear cuenta de usuario
     crearCuenta(usuarios) {
        const nombre = prompt('Ingrese su nombre de usuario: \n');
        const contraseña = prompt('Ingrese su contraseña: \n');
        const usuarioExistente = usuarios.find(user => user.nombre === nombre); //busca si en los usuarios registrados ya existe el nombre del usuario nuevo

        if (usuarioExistente) { //Si el nombre del usuario ya existe solo avisa que ya existe el usuario
            console.log('Este usuario ya existe.');
        } else { //Si el nombre del usuario no esta registrado lo agrega a lista de usuarios
            const nuevoUsuario = new Usuario(nombre, contraseña);
            usuarios.push(nuevoUsuario);
            console.log('Cuenta creada con éxito.');
        }
    }

    // Iniciar sesión de usuario
     iniciarSesion(usuarios) {
        const nombre = prompt('Ingrese su nombre de usuario: \n');
        const contraseña = prompt('Ingrese su contraseña: \n');
        const usuario = usuarios.find(user => user.nombre === nombre && user.contraseña === contraseña); //Busca si el nombre de usuario y contraseña coinciden en la lista de usuarios

        if (usuario) {
            console.log(`Bienvenido ${usuario.nombre}!`);
            return usuario;  // Retorna el usuario si se encuentra
        } else {
            console.log('Nombre de usuario o contraseña incorrectos.');
            return null;  // Si no se encuentra el usuario, retorna null
        }
    }
}

export class Biblioteca {
    constructor() {
        this.libros = [];  // Lista de libros registrados en la biblioteca
        this.usuarios = [];  // Lista de usuarios registrados
    }

    // Función para pedir un libro directamente (sin búsqueda)
    pedirLibroDirectamente(usuario) {
        console.log(this.libros)
        const nombreDelLibro = prompt('¿Qué libro desea pedir? \n');
        const libro = this.libros.find(libro => libro.nombre.toLowerCase() === nombreDelLibro.toLowerCase()); //si el nombreDelLibro se encuntra en los libros guardados retorna el nombre del libro, si no retorna undefined
    
        const libroPedido = null
        if (libro) { //Si libro tiene un valor entonces es True y se activa el if
            const dias = parseInt(prompt('¿Cuántos días desea pedir el libro? \n'));
            if (libro.cantidad > 0) { //Solo se activa si hay libros disponibles
                libro.cantidad--; //Se resta la cantidad de libros
       
                usuario.librosPedidos.push(libro)
                console.log(`Se ha pedido el libro "${libro.nombre}". Quedan ${libro.cantidad} copias. Lo tendrá por ${dias} días.`);
            } else { // Si hay 0 libros entonces avisa que no hay copias disponibles
                console.log('No hay copias disponibles de este libro.');
            }
        } else { //Si libro es undefined el if no se ejecuta
            console.log('El libro no está disponible en la biblioteca.');
        }
    }

    // Función para primero buscar un libro y luego pedirlo si esta disponible
    pedirLibroConBusqueda() {
        const nombreDelLibro = prompt('¿Qué libro desea pedir? \n'); // Primero preguntamos por el nombre del libro
        const libro = this.libros.find(libro => libro.nombre.toLowerCase() === nombreDelLibro.toLowerCase()); // Buscamos el libro en la lista de libros

        if (libro) { // Primero verifica si el libro fue encontrado
            if (libro.cantidad > 0) { // Luego verifica si hay libros disponibles
                console.log(`El libro "${libro.nombre}" está disponible. Hay ${libro.cantidad} copias.`); // Avisamos que hay copias disponibles y dice cuantas copias hay

                // Preguntamos si el usuario quiere pedir el libro
                const deseaPedir = prompt('¿Desea pedir el libro? (sí/no) \n').toLowerCase();
                if (deseaPedir === 'sí' || deseaPedir === 'si') {
                    const dias = parseInt(prompt('¿Cuántos días desea pedir el libro? \n')); // Si el usuario quiere pedirlo, preguntamos por cuántos días lo quiere pedir
                    libro.cantidad--; // Reducimos la cantidad de copias disponibles
                    console.log(`Se ha pedido el libro "${libro.nombre}". Quedan ${libro.cantidad} copias. Lo tendrá por ${dias} días.`);
                } else {
                    console.log('No se ha realizado el préstamo del libro.');
                }
            } else {
                console.log('Lo siento, no hay copias disponibles de este libro.'); // Si no hay copias disponibles, avisa al usuario
            }
        } else {
            console.log('El libro no está disponible en la biblioteca.');
        }
    }


    // Función para agregar un libro
    agregarLibro() {
        const nombre = prompt('¿Qué nombre le desea agregar al libro? \n');
        const autor = prompt('¿De qué autor es el libro? \n');
        const cantidad = parseInt(prompt('¿Cuántas copias desea agregar? \n'), 10);

        const nuevoLibro = new Libro(nombre, autor, cantidad);
        this.libros.push(nuevoLibro);
        console.log(`El libro "${nombre}" de ${autor} ha sido agregado con ${cantidad} copias.`);
    }

    // Función para eliminar un libro
    eliminarLibro() {
        const nombreDelLibro = prompt('¿Qué libro desea eliminar? \n');
        const index = this.libros.findIndex(libro => libro.nombre.toLowerCase() === nombreDelLibro.toLowerCase());

        if (index !== -1) {
            this.libros.splice(index, 1); // Eliminar el libro encontrado
            console.log(`El libro "${nombreDelLibro}" ha sido eliminado de la biblioteca.`);
        } else {
            console.log('El libro no está registrado en la biblioteca.');
        }
    }
}
