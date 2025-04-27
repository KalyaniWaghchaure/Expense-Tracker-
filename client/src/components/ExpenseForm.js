// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';

function ExpenseForm({ onSubmit, currentExpense, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().substr(0, 10)
  });

  useEffect(() => {
    if (currentExpense && isEditing) {
      setFormData({
        amount: currentExpense.amount,
        category: currentExpense.category,
        description: currentExpense.description,
        date: new Date(currentExpense.date).toISOString().substr(0, 10)
      });
    }
  }, [currentExpense, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      onSubmit(currentExpense._id, formData);
    } else {
      onSubmit(formData);
    }
    
    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Shopping', 
    'Housing', 'Utilities', 'Healthcare', 'Education', 'Other'
  ];

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
          {isEditing && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;