import React, { useState } from 'react';
import { fetchRecipes, fetchRecipeDetails } from './api';
import './App.css';

function AppStyled() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async () => {
    const results = await fetchRecipes(query);
    setRecipes(results);
  };

  const handleRecipeClick = async (recipeId) => {
    const recipeDetails = await fetchRecipeDetails(recipeId);
    setSelectedRecipe(recipeDetails);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Recipe Generator</h1>
      </header>

      <section className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Search for recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </section>

      <section className="recipes-section">
        {recipes.length > 0 ? (
          <ul className="recipes-list">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-summary">{recipe.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-recipes">No recipes found</p>
        )}
      </section>

      {selectedRecipe && (
        <section className="selected-recipe-section">
          <h2 className="selected-recipe-title">{selectedRecipe.title}</h2>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="selected-recipe-image"
          />
          <h3>Instructions:</h3>
          <ol className="instructions-list">
            {selectedRecipe.instructions.split('. ').map((step, index) => (
              <li key={index} className="instruction-step">{step}</li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

export default AppStyled;
