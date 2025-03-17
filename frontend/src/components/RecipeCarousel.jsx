import React from "react";
import { Carousel } from "./ui/apple-cards-carousel";
import GlowingRecipeCard from "../components/GlowRecipeCard";

export function RecipeCarousel({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No recipes found. Be the first to add one!</p>
      </div>
    );
  }

  const recipeCards = recipes.map((recipe, index) => (
    <GlowingRecipeCard key={recipe.id || index} recipe={recipe} index={index} />
  ));

  return (
    <div className="w-full h-full py-10">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-6">
        Discover Delicious Recipes
      </h2>
      <Carousel items={recipeCards} />
    </div>
  );
}

export default RecipeCarousel;