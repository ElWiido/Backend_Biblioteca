import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Autor = sequelize.define('Autor', {
  autor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais_origen: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'autores', // nombre exacto en la BD
  timestamps: false, // desactiva createdAt y updatedAt
});

export default Autor;
