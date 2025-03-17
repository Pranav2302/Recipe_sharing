import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Recipe from './Recipe.js';
import Category from './Category.js';

const RecipeCategory = sequelize.define('RecipeCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Recipes',
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Define many-to-many relationship
Recipe.belongsToMany(Category, { 
  through: RecipeCategory,
  foreignKey: 'recipeId',
  as: 'categories'
});
Category.belongsToMany(Recipe, { 
  through: RecipeCategory,
  foreignKey: 'categoryId',
  as: 'recipes'
});

export default RecipeCategory;