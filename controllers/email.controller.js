import nodemailer from "nodemailer";
import Usuario from "../models/usuarios.model.js";
import Libro from "../models/libros.model.js";
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporte de correos
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD 
  }
});

// Función que recibe codigo y usuario_id
export const enviarCodigoPorCorreo = async (codigo, usuario_id, libro_id) => {
  try {
    // Buscar el usuario en la BD
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    const libro = await Libro.findByPk(libro_id);
    if (!libro) {
      throw new Error("Libro no encontrado");
    }

    // Preparar contenido del correo
    const mailOptions = {
      from: '"CODIGO PRESTAMO BIBLIOTECA" <tu_correo@gmail.com>',
      to: usuario.correo, //correo del usuario
      subject: "Tu código de préstamo",
      html: `<p>Hola <b>${usuario.nombre}</b>,</p>
             <p>Para confirmar el prestamo del libro <b>${libro.titulo}</b></p>
             <p>El código de préstamo es: <b>${codigo}</b></p>
             <p>Gracias por usar nuestro sistema 📚</p>`
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    console.log("Correo enviado correctamente");
    return { success: true, message: "Correo enviado" };
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return { success: false, error };
  }
};
