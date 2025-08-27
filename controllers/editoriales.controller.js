import Editorial from '../models/editoriales.model.js';

// Obtener todos los editoriales
export const getEditoriales = async (req, res) => {
  try {
    const editoriales = await Editorial.findAll();
    res.json(editoriales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los editoriales', error });
  }
};

// Obtener un editorial por ID
export const getEditorialById = async (req, res) => {
  try {
    const { id } = req.params;
    const editorial = await Editorial.findByPk(id);

    if (!editorial) {
      return res.status(404).json({ message: 'Editorial no encontrado' });
    }

    res.json(editorial);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener editorial', error });
  }
};

// Crear un nuevo editorial
export const createEditorial = async (req, res) => {
  try {
    const { nombre, direccion} = req.body;

    const nuevoEditorial = await Editorial.create({ nombre, direccion });

    res.status(201).json(nuevoEditorial);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear editorial', error });
  }
};

// Actualizar un autor
export const updateEditorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion } = req.body;

    const editorial = await Editorial.findByPk(id);
    if (!editorial) {
      return res.status(404).json({ message: 'Editorial no encontrado' });
    }

    editorial.nombre = nombre;
    editorial.direccion = direccion;
    await editorial.save();

    res.json(editorial);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar editorial', error });
  }
};

// Eliminar un autor
export const deleteEditorial = async (req, res) => {
  try {
    const { id } = req.params;

    const editorial = await Editorial.findByPk(id);
    if (!editorial) {
      return res.status(404).json({ message: 'Editorial no encontrado' });
    }

    await editorial.destroy();
    res.json({ message: 'Editorial eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar editorial', error });
  }
};
