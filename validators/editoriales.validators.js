import { check } from "express-validator";
import Editorial from "../models/editoriales.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const EditorialValidators = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre de la editorial es obligatorio")
        .isLength({ min: 1 })
        .withMessage("El nombre debe tener al menos 1 caracteres")
        .custom(async (value, { req }) => {
            // Solo validar si la petición es de creación
            if (req.method === "POST") {
                const editorial = await Editorial.findOne({ where: { nombre: value } });
                if (editorial) {
                    throw new Error("La editorial ya está registrada");
                }
            }
            return true;
        }),
    check("direccion")   
        .notEmpty()
        .withMessage("El direccion es obligatorio")
        .isLength({ min: 5 })
        .withMessage("La dirección debe tener al menos 5 caracteres"),
    validateResult,
];

export default EditorialValidators;
