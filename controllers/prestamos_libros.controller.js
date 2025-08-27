import Prestamo_libro from '../models/prestamos_libros.model.js';
import { enviarCodigoPorCorreo } from '../controllers/email.controller.js';
import Libro from '../models/libros.model.js';

// Obtener todos los prestamos de libros
export const getPrestamos_libros = async (req, res) => {
  try {
    const prestamos_libros = await Prestamo_libro.findAll();
    res.json(prestamos_libros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los prestamos de libros', error });
  }
};

// Obtener un Prestamo_libro por id
export const getPrestamo_libroById = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo_libro = await Prestamo_libro.findByPk(id);

    if (!prestamo_libro) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }

    res.json(prestamo_libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener prestamo', error });
  }
};

// Crear un nuevo prestamo libro
export const createPrestamo_libro = async (req, res) => {
  try {
    const { usuario_id, libro_id, fecha_entrega, fecha_devolucion } = req.body;


    // Generar número aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);

    const nuevoPrestamo_libro = await Prestamo_libro.create({
      usuario_id,
      libro_id,
      fecha_entrega,
      fecha_devolucion: null,
      codigo
    });

    // Actualizar el estado del libro a "prestado"
    await Libro.update(
      { estado_id: 6 },
      { where: { libro_id } }
    );

    // Enviar correo al usuario con el código
    await enviarCodigoPorCorreo(codigo, usuario_id, libro_id);

    res.status(201).json(nuevoPrestamo_libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear prestamo libro', error });
  }
};


// Actualizar un prestamo libro
export const updatePrestamo_libro = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, libro_id, fecha_entrega, fecha_devolucion } = req.body;

    const prestamo_libro = await Prestamo_libro.findByPk(id);
    if (!prestamo_libro) {
      return res.status(404).json({ message: 'Prestamo no encontrado' });
    }

    prestamo_libro.usuario_id = usuario_id;
    prestamo_libro.libro_id = libro_id;
    prestamo_libro.fecha_entrega = fecha_entrega;
    prestamo_libro.fecha_devolucion = fecha_devolucion;

    await prestamo_libro.save();
    
    res.json(prestamo_libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar prestamo', error });
  }
};

// Eliminar un prestamo_libro 
export const deletePrestamo_libro = async (req, res) => {
  try {

    const { id } = req.params;

    const prestamo_libro = await Prestamo_libro.findByPk(id);
    if (!prestamo_libro) {
      return res.status(404).json({ message: 'Prestamo Libro no encontrado' });
    }

    await prestamo_libro.destroy();
    res.json({ message: 'Prestamo Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar prestamo libro', error });
  }
};

// Confirmar un préstamo con código
export const confirmarPrestamo = async (req, res) => {
  try {
    const { id } = req.params; 
    const { codigo } = req.body; 

    const prestamo = await Prestamo_libro.findByPk(id);
    if (!prestamo) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    if (prestamo.codigo !== parseInt(codigo)) {
      await prestamo.destroy();
      await Libro.update(
        { estado_id: 1},
        { where: { libro_id: prestamo.libro_id }}
      )
      return res.status(400).json({ message: "Código incorrecto. Préstamo cancelado." });
    }

    // Si el código coincide → marcar libro como prestado
    await Libro.update(
      { estado_id: 2 },
      { where: { libro_id: prestamo.libro_id } }
    );

    res.json({ message: "Préstamo confirmado con éxito.", prestamo });
  } catch (error) {
    res.status(500).json({ message: "Error al confirmar préstamo", error });
  }
};


// Actualizar solo la fecha_devolucion de un préstamo (PATCH)
export const patchPrestamo_libro = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_devolucion } = req.body;

    const prestamo_libro = await Prestamo_libro.findByPk(id);

    if (!prestamo_libro) {
      return res.status(404).json({ message: 'Préstamo no encontrado' });
    }

    // Actualizar solo la fecha_devolucion
    prestamo_libro.fecha_devolucion = fecha_devolucion;
    await prestamo_libro.save();

    // Actualizar el estado del libro a "disponible"
    await Libro.update(
      { estado_id: 1 },
      { where: { libro_id: prestamo_libro.libro_id } }
    );


    res.json(prestamo_libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar fecha de devolución', error });
  }
};