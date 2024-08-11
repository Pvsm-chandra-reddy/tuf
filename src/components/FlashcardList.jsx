// src/components/FlashcardList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  if (flashcards.length === 0) {
    return <div className="text-center">Loading flashcards...</div>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-96 h-64 bg-white shadow-md rounded-lg flex items-center justify-center cursor-pointer"
        onClick={handleFlip}
      >
        <p className="text-xl font-semibold text-center p-4">
          {flipped ? currentCard.answer : currentCard.question}
        </p>
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardList;