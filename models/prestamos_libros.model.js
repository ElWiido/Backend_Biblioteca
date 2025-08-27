import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Prestamo_libro = sequelize.define('Prestamo_libro', {
  prestamo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER ,
    primaryKey: true,
    allowNull: false,
    references : {
      model: 'usuarios', // nombre de la tabla referenciada
      key: 'usuario_id'  // columna referenciada
    }
  },
  libro_id: {
    type: DataTypes.INTEGER ,
    primaryKey: true,
    allowNull: false,
    references : {
      model: 'libros', // nombre de la tabla referenciada
      key: 'libro_id'  // columna referenciada
    }
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fecha_devolucion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'prestamos_libros',
  timestamps: false
});

export default Prestamo_libro;
