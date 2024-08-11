// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editingCard, setEditingCard] = useState(null);

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

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flashcards', newCard);
      setNewCard({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleEditCard = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${editingCard.id}`, editingCard);
      setEditingCard(null);
      fetchFlashcards();
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <form onSubmit={handleAddCard} className="mb-8">
        <input
          type="text"
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Add Flashcard
        </button>
      </form>
      <div className="space-y-4">
        {flashcards.map((card) => (
          <div key={card.id} className="bg-white p-4 rounded shadow">
            {editingCard && editingCard.id === card.id ? (
              <form onSubmit={handleEditCard}>
                <input
                  type="text"
                  value={editingCard.question}
                  onChange={(e) => setEditingCard({ ...editingCard, question: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={editingCard.answer}
                  onChange={(e) => setEditingCard({ ...editingCard, answer: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                  Save
                </button>
                <button onClick={() => setEditingCard(null)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p className="font-semibold">Q: {card.question}</p>
                <p>A: {card.answer}</p>
                <div className="mt-2">
                  <button onClick={() => setEditingCard(card)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;