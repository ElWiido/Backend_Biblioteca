import Genero from '../models/generos.model.js';

// Obtener todos los generos
export const getGenero = async (req, res) => {
  try {
    const genero = await Genero.findAll();
    res.json(genero);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener generos', error });
  }
};

// Obtener un genero por ID
export const getGeneroById = async (req, res) => {
  try {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: 'Genero no encontrado' });
    }

    res.json(genero);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener genero', error });
  }
};

// Crear un nuevo genero
export const createGenero = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevoGenero = await Genero.create({ nombre });

    res.status(201).json(nuevoGenero);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear genero', error });
  }
};

// Actualizar un genero
export const updateGenero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).json({ message: 'Genero no encontrado' });
    }

    genero.nombre = nombre;
    await genero.save();

    res.json(genero);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar genero', error });
  }
};

// Eliminar un genero
export const deleteGenero = async (req, res) => {
  try {
    const { id } = req.params;

    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).json({ message: 'Genero no encontrado' });
    }

    await genero.destroy();
    res.json({ message: 'Genero eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar genero', error });
  }
};
