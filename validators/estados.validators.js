import { check } from "express-validator";
import Estado from "../models/estados.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const libroValidators = [
    check("nombre_estado")
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isLength({ min: 3 })
        .withMessage("El estado debe tener al menos 3 caracteres")
        .custom(async (value) => {
            const estado = await Estado.findOne({ where: { nombre_estado: value } });
            if (estado) {
                throw new Error("El nombre de estado ya está registrado");
            }
            return true;
        }),
  validateResult,
];

export default libroValidators;