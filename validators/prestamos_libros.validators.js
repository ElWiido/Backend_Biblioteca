import { check } from "express-validator";
import Usuario from "../models/usuarios.model.js";
import Libro from "../models/libros.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const prestamo_libroValidators = [
    check("usuario_id")
        .notEmpty()
        .withMessage("El usuario es obligatorio")
        .isNumeric()
        .withMessage("El usuario_id debe ser un número")
        .custom(async (value) => {
            const usuario = await Usuario.findOne({ where: { usuario_id: value } });
            if (!usuario) {
                throw new Error("El usuario no está registrado");
            }
            return true;
        }),

    check("libro_id")
        .notEmpty()
        .withMessage("El id del libro es obligatorio")
        .isNumeric()
        .withMessage("El id del libro debe ser un número")
        .custom(async (value) => {
            const libro = await Libro.findOne({ where: { libro_id: value } });
            if (!libro) {
                throw new Error("El libro no está registrado");
            }
            return true;
    }),

    check("fecha_entrega")
        .notEmpty()
        .withMessage("La fecha de entrega es obligatoria"),

  validateResult,
];

export default prestamo_libroValidators
;