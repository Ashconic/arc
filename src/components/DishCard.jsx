import React from 'react';

const DishCard = ({ dish, onClick }) => {
  return (
    <div className="dish-card" onClick={onClick}>
      <h3>{dish.name}</h3>
      <p>{dish.description?.substring(0, 80)}...</p>
    </div>
  );
};

export default DishCard;
