import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeService } from '../services/api';
import RecipeCarousel from '../components/RecipeCarousel';
import CategoryRecipeCarousel from '../components/CategoryRecipeCarousel';
import { PlusCircle, ChevronRight, ChevronLeft } from 'lucide-react';
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
    <div className="relative min-h-screen">
      {/* Aceternity-inspired animated background */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-white dark:bg-slate-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          
          {/* Gradient spotlight effects */}
          <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-blue-500 opacity-20 blur-[80px] filter" />
          <div className="absolute right-[20%] top-[40%] h-48 w-48 rounded-full bg-purple-500 opacity-20 blur-[80px] filter" />
          <div className="absolute left-[30%] bottom-[10%] h-40 w-40 rounded-full bg-cyan-500 opacity-20 blur-[80px] filter" />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-slow rounded-full bg-white/10 dark:bg-white/20"
                style={{
                  width: `${Math.random() * 5 + 1}px`,
                  height: `${Math.random() * 5 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-8 z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12 px-4 md:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6 md:mb-0">
            <span className="block h-1 w-20 rounded bg-gradient-to-r from-blue-500 to-purple-500 mb-3"></span>
            <h2 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">Discover</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Today's Recipes
              </span>
            </h1>
            <div className="absolute -z-10 -top-10 -left-10 h-32 w-32 bg-blue-500/10 rounded-full blur-xl"></div>
          </div>
          
          <Link 
            to="/create-recipe"
            className="relative group overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Recipe</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 -z-20 bg-[conic-gradient(from_var(--angle),theme(colors.blue.600),theme(colors.purple.600),theme(colors.blue.600))] opacity-0 group-hover:opacity-100"></div>
          </Link>
        </motion.div>
        
        {/* Glassmorphism card for main content */}
        <motion.div 
          className="relative max-w-7xl mx-auto rounded-3xl backdrop-blur-md bg-white/30 dark:bg-black/30 p-6 md:p-8 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Main Recipe Carousel */}
          <div className="mb-12 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
            <RecipeCarousel recipes={recipes} />
          </div>

          {/* Easy Recipes Carousel */}
          {easyRecipes.length > 0 && (
            <div className="mb-8 relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-2xl"></div>
              <CategoryRecipeCarousel 
                title="Quick & Easy Recipes" 
                recipes={easyRecipes} 
              />
            </div>
          )}

          {/* Pagination with animated buttons */}
          {pagination && pagination.totalPages > 1 && (
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 bg-white/60 dark:bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/20 dark:border-white/10 shadow-lg">
                <motion.button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="relative px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  <span>Previous</span>
                </motion.button>
                
                <div className="flex gap-1">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <motion.button 
                      key={index} 
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        currentPage === index + 1 
                          ? "text-white" 
                          : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {currentPage === index + 1 && (
                        <motion.div
                          layoutId="activePage"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{index + 1}</span>
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="relative px-4 py-2 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <span>Next</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}