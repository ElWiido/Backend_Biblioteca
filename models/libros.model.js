import { DataTypes } from 'sequelize';
import sequelize from '../database/connection_db.js';

const Libro = sequelize.define('Libro', {
  libro_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_publicacion: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  autor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references : {
      model: 'autores',
      key: 'autor_id'  
    }
  },
  editorial_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references : {
      model: 'editoriales',
      key: 'editorial_id'  
    }
  },
  genero_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references : {
      model: 'generos',
      key: 'genero_id'
    }
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references : {
      model: 'estados',
      key: 'estado_id'
    }
  }
}, {
  tableName: 'libros',
  timestamps: false
});

export default Libro;
