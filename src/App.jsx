// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-800">Flashcard App</h1>
                </Link>
                <div className="ml-6 flex space-x-8">
                  <Link to="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                    Flashcards
                  </Link>
                  <Link to="/admin" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Switch>
            <Route exact path="/" component={FlashcardList} />
            <Route path="/admin" component={AdminDashboard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;