import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  prepTimeMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cookTimeMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  difficulty: {
    type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
    defaultValue: 'Medium'
  },
  isVegetarian: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isVegan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isGlutenFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDairyFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isKeto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPaleo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// Define relationship
Recipe.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
User.hasMany(Recipe, { foreignKey: 'userId' });

export default Recipe;