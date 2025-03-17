import React, { useState } from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import { Clock, Users, Award, ChefHat, Utensils, UserIcon } from "lucide-react";

export const RecipeDetailGlowing = ({ recipe }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!recipe) return null;
  
  // Default images
  const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3";
  const defaultUserImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80";
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {recipe.title}
        </h1>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2 flex items-center justify-center">
              {recipe?.User?.profilePicture ? (
                <img 
                  src={recipe.User.profilePicture} 
                  alt={recipe.User.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultUserImage;
                  }}
                />
              ) : (
                <UserIcon className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {recipe?.User?.username || "Anonymous"}
            </span>
          </div>
          
          <span className="mx-2 text-gray-400">•</span>
          
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(recipe?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Categories */}
      {recipe.Categories && recipe.Categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.Categories.map(category => (
              <span 
                key={category.id} 
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {(recipe?.image || !imageError) && (
        <div className="relative rounded-2xl border p-2 mb-6">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <img 
            src={imageError ? defaultFoodImage : (recipe.image || defaultFoodImage)} 
            alt={recipe.title}
            className="w-full h-auto rounded-xl shadow-md"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <span className="block text-blue-600 dark:text-blue-400 font-medium">Prep Time</span>
            <span className="text-gray-800 dark:text-white">{recipe?.prepTimeMinutes || 0} mins</span>
          </div>
        </div>
        
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl text-center">
            <Utensils className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <span className="block text-blue-600 dark:text-blue-400 font-medium">Cook Time</span>
            <span className="text-gray-800 dark:text-white">{recipe?.cookTimeMinutes || 0} mins</span>
          </div>
        </div>
        
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl text-center">
            <Award className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <span className="block text-blue-600 dark:text-blue-400 font-medium">Difficulty</span>
            <span className="text-gray-800 dark:text-white">{recipe?.difficulty || "Medium"}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {recipe?.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <ChefHat className="h-5 w-5 mr-2 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Ingredients
              </h2>
            </div>
            <ul className="space-y-2">
              {recipe?.ingredients?.split('\n').map((ingredient, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="relative rounded-2xl border p-2">
          <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Utensils className="h-5 w-5 mr-2 text-blue-500" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Instructions
              </h2>
            </div>
            <ol className="space-y-4 list-decimal list-inside">
              {recipe?.instructions?.split('\n').map((step, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">{step.trim()}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailGlowing;