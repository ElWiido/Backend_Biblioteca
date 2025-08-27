import Autor from '../models/autores.model.js';

// Obtener todos los autores
export const getAutores = async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener autores', error });
  }
};

// Obtener un autor por ID
export const getAutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByPk(id);

    if (!autor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    res.json(autor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener autor', error });
  }
};

// Crear un nuevo autor
export const createAutor = async (req, res) => {
  try {
    const { nombre, apellido, pais_origen } = req.body;

    const nuevoAutor = await Autor.create({ nombre, apellido, pais_origen });

    res.status(201).json(nuevoAutor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear autor', error });
  }
};

// Actualizar un autor
export const updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, pais_origen } = req.body;

    const autor = await Autor.findByPk(id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    autor.nombre = nombre;
    autor.apellido = apellido;
    autor.pais_origen = pais_origen;
    await autor.save();

    res.json(autor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar autor', error });
  }
};

// Eliminar un autor
export const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;

    const autor = await Autor.findByPk(id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    await autor.destroy();
    res.json({ message: 'Autor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar autor', error });
  }
};
