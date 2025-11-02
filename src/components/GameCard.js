// src/components/GameCard.js
import React from 'react';

function GameCard({ game }) {
  return (
    // Div pembungkus luar sudah tidak diperlukan karena dihandle oleh Link
    <>
      <img src={game.background_image} alt={game.name} />
      <div className="game-info">
        <h3>{game.name}</h3>
        <p><strong>⭐ Custom Rating:</strong> {game.custom_rating}</p>
        <p><strong>📅 Release Date:</strong> {game.released}</p>
      </div>
    </>
  );
}

export default GameCard;