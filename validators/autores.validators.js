import { check } from "express-validator";
import Autor from "../models/autores.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const autorValidators = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre del autor es obligatorio")
        .isLength({ min: 1 })
        .withMessage("El nombre debe tener al menos 1 caracter")
        .custom(async (value, { req }) => {
            if (req.method === "POST") {
                const { apellido } = req.body;
                if (!apellido) {
                    throw new Error("El apellido del autor es obligatorio");
                }
                const autor = await Autor.findOne({
                    where: {
                        nombre: value,
                        apellido: apellido
                    }
                });

                if (autor) {
                    throw new Error("El autor con ese nombre y apellido ya está registrado");
                }
            }
            return true;
        }),

    check("apellido")   
        .notEmpty()
        .withMessage("El apellido del autor es obligatorio"),
        
    check("pais_origen")
        .notEmpty()
        .withMessage("El país de origen es obligatorio"),

    validateResult,
];

export default autorValidators;
