import { check } from "express-validator";
import Libro from "../models/libros.model.js";
import Autor from "../models/autores.model.js";
import Editorial from "../models/editoriales.model.js";
import Genero from "../models/generos.model.js";
import Estado from "../models/estados.model.js";
import { validateResult } from "../helpers/validateHelper.js";


const libroValidators = [
    check("titulo")
        .notEmpty()
        .withMessage("El titulo del libro es obligatorio")
        .isLength({ min: 1 })
        .withMessage("El nombre debe tener al menos 1 caracteres"),

    check("fecha_publicacion")   
        .notEmpty()
        .withMessage("El año de publicacion es obligatorio")
        .isLength({ min: 4 })
        .withMessage("Debe de colocar un año de publicacion valido"),

    check("autor_id")
        .notEmpty().withMessage("El autor es obligatorio")
        .isNumeric().withMessage("El autor debe ser un número")
        .custom(async (value) => {
            const autor = await Autor.findByPk(value); 
            if (!autor) {
                throw new Error("El autor no está registrado");
            }
            return true;
        }),

    check("editorial_id")
        .notEmpty().withMessage("El editorial es obligatorio")
        .isNumeric().withMessage("El editorial debe ser un número")
        .custom(async (value) => {
            const editorial = await Editorial.findByPk(value); 
            if (!editorial) {
                throw new Error("El editorial no está registrado");
            }
            return true;
        }),

    check("genero_id")
        .notEmpty().withMessage("El genero es obligatorio")
        .isNumeric().withMessage("El genero debe ser un número")
        .custom(async (value) => {
            const genero = await Genero.findByPk(value); 
            if (!genero) {
                throw new Error("El genero no está registrado");
            }
            return true;
        }),
  validateResult,
];

export default libroValidators;