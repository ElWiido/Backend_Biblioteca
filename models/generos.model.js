import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Genero = sequelize.define('Genero', {
  genero_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'generos', // nombre exacto en la BD
  timestamps: false, // desactiva createdAt y updatedAt
});

export default Genero;
