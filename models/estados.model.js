import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Estado = sequelize.define('Estado', {
  estado_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'estados', // nombre exacto en la BD
  timestamps: false, // desactiva createdAt y updatedAt
});

export default Estado;
