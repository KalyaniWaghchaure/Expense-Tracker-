// src/components/ExpenseList.js
import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>Expenses</h2>
        <p className="no-expenses">No expenses found. Start adding some!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.map(expense => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ExpenseList;