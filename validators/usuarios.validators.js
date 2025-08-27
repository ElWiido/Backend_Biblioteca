import { check } from "express-validator";
import Usuario from "../models/usuarios.model.js";
import { validateResult } from "../helpers/validateHelper.js";

const usuarioValidators = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ min: 2 })
        .withMessage("El nombre debe tener al menos 2 caracteres"),

    check("apellido")   
        .notEmpty()
        .withMessage("Los apellidos son obligatorios")
        .isLength({ min: 2 })
        .withMessage("Los apellidos deben tener al menos 2 caracteres"),

    check("correo")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .custom(async (value, { req }) => {
            // Solo validar si es creación
            if (req.method === "POST") {
                const usuario = await Usuario.findOne({ where: { correo: value } });
                if (usuario) {
                    throw new Error("El email ya está registrado");
                }
            }
            return true;
        }),

    check("telefono")
        .notEmpty()
        .withMessage("El teléfono es obligatorio")
        .isLength({ min: 7, max: 15 })
        .withMessage("El teléfono debe tener entre 7 y 15 caracteres")
        .isNumeric()
        .withMessage("El teléfono debe contener solo números")
        .custom(async (value, { req }) => {
            // Solo validar si es creación
            if (req.method === "POST") {
                const usuario = await Usuario.findOne({ where: { telefono: value } });
                if (usuario) {
                    throw new Error("El telefono ya está registrado");
                }
            }
            return true;
        }),

    check("direccion")
        .notEmpty()
        .withMessage("La dirección es obligatoria")
        .isLength({ min: 5 })
        .withMessage("La dirección debe tener al menos 5 caracteres"),
  validateResult,
];

export default usuarioValidators;