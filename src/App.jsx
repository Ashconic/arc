import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import ChatBot from './components/ChatBot'; // 👈 Add this




function App() {
  const [mode, setMode] = useState('ingredients');
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const API_KEY = import.meta.env.VITE_TASTY_API_KEY;

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setRecipes([]);
    setSelectedDish(null);

    try {
      const response = await axios.get(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${input}`,
        {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
          },
        }
      );

      const data = response.data.results;
      setRecipes(data);
    } catch (error) {
      console.error('API error:', error);
      alert('Failed to fetch recipes. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
  };

  const handleBack = () => {
    setSelectedDish(null);
  };

  return (
    <div className="container">
      <h1>🍽️ AI Recipe Generator</h1>

      {!selectedDish && (
        <>
          <div className="toggle">
            <button
              className={mode === 'ingredients' ? 'active' : ''}
              onClick={() => setMode('ingredients')}
            >
              By Ingredients
            </button>
            <button
              className={mode === 'dish' ? 'active' : ''}
              onClick={() => setMode('dish')}
            >
              By Dish Name
            </button>
          </div>

          <input
            type="text"
            placeholder={
              mode === 'ingredients'
                ? 'e.g. potato, paneer, tomato'
                : 'e.g. Butter Chicken'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleSearch}>Search Recipes</button>
        </>
      )}

      {loading && <p style={{ color: 'white' }}>Loading recipes...</p>}

      {!selectedDish && (
        <div className="recipe-grid">
          {recipes.map((dish, idx) => (
            <div key={idx} className="dish-card" onClick={() => handleDishClick(dish)}>
              <h3>{dish.name}</h3>
              {dish.thumbnail_url && (
                <img src={dish.thumbnail_url} alt={dish.name} />
              )}
              <p>{dish.description || 'No description available.'}</p>
            </div>
          ))}
        </div>
      )}

      {selectedDish && (
        <div className="dish-details">
          <button onClick={handleBack}>⬅ Back</button>
          <h2>{selectedDish.name}</h2>
          {selectedDish.thumbnail_url && (
            <img src={selectedDish.thumbnail_url} alt={selectedDish.name} />
          )}
          <p>{selectedDish.description || 'No description.'}</p>
          <h4>🍽 Servings: {selectedDish.num_servings || 'N/A'}</h4>

          {selectedDish.nutrition && (
            <div>
              <h4>🔥 Calories: {selectedDish.nutrition.calories || 'N/A'}</h4>
              <p>Protein: {selectedDish.nutrition.protein || 'N/A'}g</p>
              <p>Fat: {selectedDish.nutrition.fat || 'N/A'}g</p>
              <p>Carbs: {selectedDish.nutrition.carbohydrates || 'N/A'}g</p>
            </div>
          )}

          {selectedDish.instructions?.length > 0 && (
            <>
              <h4>🧑‍🍳 Steps:</h4>
              <ol>
                {selectedDish.instructions.map((step, idx) => (
                  <li key={idx}>{step.display_text}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      )}
      <ChatBot />
    </div>
  );
}

export default App;
