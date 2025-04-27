// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from './api';
import './styles/App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getAllExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await createExpense(expense);
      fetchExpenses();
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  const handleUpdateExpense = async (id, expense) => {
    try {
      await updateExpense(id, expense);
      fetchExpenses();
      setCurrentExpense(null);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const editExpense = (expense) => {
    setCurrentExpense(expense);
    setIsEditing(true);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <Dashboard expenses={expenses} />
          <ExpenseForm 
            onSubmit={isEditing ? handleUpdateExpense : handleAddExpense} 
            currentExpense={currentExpense}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          {loading ? (
            <p>Loading expenses...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <ExpenseList 
              expenses={expenses} 
              onDelete={handleDeleteExpense} 
              onEdit={editExpense} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;