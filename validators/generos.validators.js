import { check } from "express-validator";
import Genero from "../models/generos.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const GeneroValidators = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del genero es obligatorio")
        .isLength({ min: 2 })
        .withMessage("El nombre debe tener al menos 2 caracteres")
        .custom(async (value, { req }) => {
            const genero = await Genero.findOne({ where: { nombre: value } });
            if (genero) {
                    throw new Error("El genero ya está registrado");
                }
            return true;
        }),
    validateResult,
];

export default GeneroValidators;
