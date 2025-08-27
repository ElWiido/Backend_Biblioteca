import Libro from '../models/libros.model.js';

// Obtener todos los libros
export const getLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros', error });
  }
};

// Obtener un libro por id
export const getLibroById = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findByPk(id);

    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libro', error });
  }
};

// Crear un nuevo libro
export const createLibro = async (req, res) => {
  try {
    const { titulo, fecha_publicacion, autor_id, editorial_id, genero_id } = req.body;

    const nuevoLibro = await Libro.create({
      titulo,
      fecha_publicacion,
      autor_id,
      editorial_id,
      genero_id,
      estado_id : 1
    });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear libro', error });
  }
};

// Actualizar un libro
export const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, fecha_publicacion, autor_id, editorial_id, genero_id, estado_id } = req.body;

    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    libro.titulo = titulo;
    libro.fecha_publicacion = fecha_publicacion;
    libro.autor_id = autor_id;
    libro.editorial_id = editorial_id;
    libro.genero_id = genero_id;
    libro.estado_id = estado_id;

    await libro.save();

    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar libro', error });
  }
};

// Eliminar un libro
export const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const libro = await Libro.findByPk(id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    await libro.destroy();
    res.json({ message: 'Libro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar libro', error });
  }
};
