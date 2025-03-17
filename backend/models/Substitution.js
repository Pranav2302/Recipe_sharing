import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Ingredient from './Ingredient.js';

const Substitution = sequelize.define('Substitution', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ingredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Ingredients',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Define relationship
Substitution.belongsTo(Ingredient, {
  foreignKey: 'ingredientId',
  onDelete: 'CASCADE'
});
Ingredient.hasMany(Substitution, {
  foreignKey: 'ingredientId',
  as: 'substitutions'
});

export default Substitution;