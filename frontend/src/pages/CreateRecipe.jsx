import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreateRecipe() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: 'Medium',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    try {
      setFormError('');
      setIsSubmitting(true);
      
      // Add user ID to recipe data
      const completeRecipeData = {
        ...recipeData,
        userId: user.id,
      };
      
      const response = await recipeService.createRecipe(completeRecipeData);
      navigate(`/recipes/${response.data.id}`);
    } catch (err) {
      console.error('Error creating recipe:', err);
      setFormError(err.response?.data?.message || 'Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Create New Recipe
      </h1>
      
      {formError && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
          >
            Recipe Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter recipe title"
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="description" 
            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe your recipe"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="ingredients" 
            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
          >
            Ingredients* (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
            placeholder="2 cups flour 1/2 tsp salt 3 eggs"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="instructions" 
            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
          >
            Instructions* (one step per line)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
            placeholder="Preheat oven to 350°F
Mix dry ingredients in a bowl
Add wet ingredients and stir until combined"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label 
              htmlFor="prepTimeMinutes" 
              className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
            >
              Prep Time (minutes)
            </label>
            <input
              type="number"
              id="prepTimeMinutes"
              name="prepTimeMinutes"
              value={recipeData.prepTimeMinutes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          
          <div>
            <label 
              htmlFor="cookTimeMinutes" 
              className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
            >
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="cookTimeMinutes"
              name="cookTimeMinutes"
              value={recipeData.cookTimeMinutes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          
          <div>
            <label 
              htmlFor="servings" 
              className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
            >
              Servings
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={recipeData.servings}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="difficulty" 
            className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={recipeData.difficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        
        <div className="mb-6">
  <label 
    htmlFor="image" 
    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
  >
    Image URL
  </label>
  <div className="space-y-2">
    <input
      type="text"
      id="image"
      name="image"
      value={recipeData.image}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="https://example.com/image.jpg"
    />
    <div className="text-xs text-gray-500">
      Provide a direct URL to an image. For best results, use a square or landscape image from sites like Unsplash or Pexels.
    </div>
    {recipeData.image && (
      <div className="mt-2 border rounded-md p-2">
        <p className="text-sm font-medium mb-1">Image Preview:</p>
        <img 
          src={recipeData.image} 
          alt="Recipe preview" 
          className="w-full h-40 object-cover rounded-md bg-gray-100"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3";
            e.target.nextSibling.textContent = "⚠️ Image URL may be invalid. Using a fallback image instead.";
          }}
        />
        <p className="text-xs text-gray-500 mt-1"></p>
      </div>
    )}
  </div>
</div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}