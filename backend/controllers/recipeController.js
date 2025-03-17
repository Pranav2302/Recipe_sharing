import { Recipe, User } from '../models/index.js';
import { sequelize } from '../config/database.js';


// Get all recipes with pagination
export const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const recipes = await Recipe.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    const totalPages = Math.ceil(recipes.count / limit);
    
    res.status(200).json({
      recipes: recipes.rows,
      pagination: {
        total: recipes.count,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profilePicture']
        }
      ]
    });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, image, difficulty, userId } = req.body;
    
    // Basic validation
    if (!title || !ingredients || !instructions || !userId) {
      return res.status(400).json({ message: 'Please provide title, ingredients, instructions, and userId' });
    }
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found - recipecontroller' });
    }
    
    // Create recipe
    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      image,
      difficulty,
      userId
    });
    
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Update recipe fields
    await recipe.update(req.body);
    
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    await recipe.destroy();
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search recipes
export const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query parameter is required' });
    }
    
    const recipes = await Recipe.findAll({
      where: {
        [sequelize.Op.or]: [
          { title: { [sequelize.Op.like]: `%${query}%` } },
          { description: { [sequelize.Op.like]: `%${query}%` } },
          { ingredients: { [sequelize.Op.like]: `%${query}%` } }
        ]
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'profilePicture']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
