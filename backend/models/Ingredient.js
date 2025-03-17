import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Recipe from './Recipe.js';

const Ingredient = sequelize.define('Ingredient', {
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
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Recipes',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Define relationship
Ingredient.belongsTo(Recipe, {
  foreignKey: 'recipeId',
  onDelete: 'CASCADE'
});
Recipe.hasMany(Ingredient, {
  foreignKey: 'recipeId',
  as: 'recipeIngredients'
});

export default Ingredient;