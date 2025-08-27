import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Editorial = sequelize.define('Editorial', {
  editorial_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'editoriales',
  timestamps: false
});

export default Editorial;
