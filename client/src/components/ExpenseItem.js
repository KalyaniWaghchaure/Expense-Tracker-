// src/components/ExpenseItem.js
import React from 'react';

function ExpenseItem({ expense, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="expense-amount">${expense.amount.toFixed(2)}</div>
        <div className="expense-category">{expense.category}</div>
        <div className="expense-date">{formatDate(expense.date)}</div>
        <div className="expense-description">{expense.description}</div>
      </div>
      <div className="expense-actions">
        <button 
          className="btn-edit" 
          onClick={() => onEdit(expense)}
          aria-label="Edit"
        >
          Edit
        </button>
        <button 
          className="btn-delete" 
          onClick={() => onDelete(expense._id)}
          aria-label="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;