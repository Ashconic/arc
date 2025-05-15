import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DishDetail = () => {
  const { state } = useLocation();
  const dish = state?.dish;
  const navigate = useNavigate();

  if (!dish) return <p>No dish selected</p>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{dish.name}</h2>
      <p><strong>Calories:</strong> {dish.nutrition?.calories ?? 'N/A'}</p>
      <h3>Ingredients:</h3>
      <ul>
        {dish.sections?.[0]?.components?.map((comp, i) => (
          <li key={i}>{comp.raw_text}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ol>
        {dish.instructions?.map((step, i) => (
          <li key={i}>{step.display_text}</li>
        ))}
      </ol>
    </div>
  );
};

export default DishDetail;
