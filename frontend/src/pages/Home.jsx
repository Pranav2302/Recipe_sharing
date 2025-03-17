import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '../services/api';
import RecipeCarousel from '../components/RecipeCarousel';
import CategoryRecipeCarousel from '../components/CategoryRecipeCarousel';
import { PlusCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [easyRecipes, setEasyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await recipeService.getAllRecipes(currentPage, 12);
        setRecipes(response.data.recipes);
        setPagination(response.data.pagination);
        
        // Filter recipes for different carousels
        setEasyRecipes(response.data.recipes.filter(recipe => recipe.difficulty === 'Easy'));
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-100 border-t-blue-400 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Error</span>
        </div>
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Subtle pattern background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0zMGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00em0wIDYwYzAtMi4yMDkgMS43OTEtNCA0LTRzNCAxLjc5MSA0IDQtMS43OTEgNC00IDQtNC0xLjc5MS00LTR6TTYgMzRjMC0yLjIwOSAxLjc5MS00IDQtNHM0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNC00LTEuNzkxLTQtNHptMC0zMGMwLTIuMjA5IDEuNzkxLTQgNC00czQgMS43OTEgNCA0LTEuNzkxIDQtNCA0LTQtMS43OTEtNC00em0wIDYwYzAtMi4yMDkgMS43OTEtNCA0LTRzNCAxLjc5MSA0IDQtMS43OTEgNC00IDQtNC0xLjc5MS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat opacity-30 -z-20"></div>

      <div className="relative pt-4 pb-12 -mt-8">
        <motion.div 
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-sm font-medium text-blue-600 uppercase tracking-wider">Discover</h2>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Today's Recipes
            </h1>
          </div>
          
          <Link 
            to="/create-recipe"
            className="relative group overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Recipe</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 group-hover:scale-y-100 transition-transform origin-left"></div>
          </Link>
        </motion.div>

        {/* Main Recipe Carousel */}
        <div className="mb-8">
          <RecipeCarousel recipes={recipes} />
        </div>

        {/* Easy Recipes Carousel */}
        {easyRecipes.length > 0 && (
          <div className="mb-8">
            <CategoryRecipeCarousel 
              title="Quick & Easy Recipes" 
              recipes={easyRecipes} 
            />
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <motion.nav 
              className="flex items-center space-x-1 bg-white/60 dark:bg-black/30 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 rounded-lg border border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Previous
              </button>
              
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    currentPage === index + 1 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 rounded-lg border border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next
              </button>
            </motion.nav>
          </div>
        )}
      </div>
    </div>
  );
}