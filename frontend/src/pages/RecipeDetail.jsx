import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipeService } from '../services/api';
import RecipeDetailGlowing from '../components/RecipeDetailGlowing';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipeService.getRecipeById(id);
        setRecipe(response.data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. It may have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg">
        {error}
      </div>
    );
  }

  return <RecipeDetailGlowing recipe={recipe} />;
}