import express from 'express';
import cors from 'cors';

import librosRouter from '../routers/libros.router.js';
import autoresRouter from '../routers/autores.router.js';
import generosRouter from '../routers/generos.router.js';
import editorialesRouter from '../routers/editoriales.router.js';
import estadosRouter from '../routers/estados.router.js'; 
import usuariosRouter from '../routers/usuarios.router.js';
import prestamosLibrosRouter from '../routers/prestamos_libros.router.js';

class ServerModel {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;

        // Paths centralizados
        this.paths = {
            libros: '/api/libros',
            autores: '/api/autores',
            generos: '/api/generos',
            editoriales : '/api/editoriales',
            estados: '/api/estados',
            usuarios: '/api/usuarios',
            prestamos_libros: '/api/prestamos_libros'
        };

        this.middlewares();     // Aplicar middlewares (cors, json, etc)
        this.routes();          // Cargar rutas
    }

    // Middlewares
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    // Rutas de la API
    routes() {
        this.app.use(this.paths.libros, librosRouter);
        this.app.use(this.paths.autores, autoresRouter);
        this.app.use(this.paths.generos, generosRouter);
        this.app.use(this.paths.editoriales, editorialesRouter);
        this.app.use(this.paths.estados, estadosRouter);
        this.app.use(this.paths.usuarios, usuariosRouter);
        this.app.use(this.paths.prestamos_libros, prestamosLibrosRouter);
    }

    // Escuchar el servidor
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${this.PORT}`);
        });
    }
}

export default ServerModel;
