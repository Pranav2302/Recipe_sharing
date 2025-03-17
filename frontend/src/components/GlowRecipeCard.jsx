"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlowingEffect } from "./ui/glowing-effect";
import { Clock, Users, Award } from "lucide-react";

export const GlowingRecipeCard = ({ recipe, index }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Default food image in case the original URL is broken
  const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3";
  
  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div className="relative min-h-[18rem] w-56 md:w-80 flex-shrink-0">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          onClick={handleClick}
          className="cursor-pointer relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-0.75 bg-white dark:bg-neutral-900 dark:shadow-[0px_0px_27px_0px_#2D2D2D]"
        >
          <div className="h-32 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={imageError ? defaultFoodImage : (recipe.image || defaultFoodImage)}
              alt={recipe.title}
              className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
          
          <div className="flex flex-col gap-3 px-4 pb-4">
            <h3 className="pt-0.5 text-lg font-semibold text-balance text-black dark:text-white">
              {recipe.title}
            </h3>
            
            <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
              {recipe.description || "A delicious recipe to try!"}
            </p>
            
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock className="h-3 w-3" />
                <span>{(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} min</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <Users className="h-3 w-3" />
                <span>{recipe.servings || "N/A"}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <Award className="h-3 w-3" />
                <span>{recipe.difficulty || "Medium"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowingRecipeCard;