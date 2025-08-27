import Estado from '../models/estados.model.js';

// Obtener todos los estados
export const getEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estados', error });
  }
};

// Obtener un estado por ID
export const getEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const estado = await Estado.findByPk(id);

    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    res.json(estado);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estado', error });
  }
};

// Crear un nuevo estado
export const createEstado = async (req, res) => {
  try {
    const { nombre_estado } = req.body;

    const nuevoEstado = await Estado.create({ nombre_estado });

    res.status(201).json(nuevoEstado);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear estado', error });
  }
};

// Actualizar un estado
export const updateEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_estado } = req.body;

    const estado = await Estado.findByPk(id);
    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    estado.nombre_estado = nombre_estado;
    await estado.save();

    res.json(estado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado', error });
  }
};

// Eliminar un autor
export const deleteEstado = async (req, res) => {
  try {
    const { id } = req.params;

    const estado = await Estado.findByPk(id);
    if (!estado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    await estado.destroy();
    res.json({ message: 'Estado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estado', error });
  }
};
