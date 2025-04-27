// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { format, startOfMonth, endOfMonth, parseISO, getMonth } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

function Dashboard({ expenses }) {
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  });
  
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: '#4CAF50' }]
  });

  useEffect(() => {
    processData(expenses);
  }, [expenses]);

  const processData = (expenses) => {
    if (!expenses || expenses.length === 0) return;

    // Process category data
    const categories = {};
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });

    const categoryLabels = Object.keys(categories);
    const categoryValues = Object.values(categories);
    const categoryColors = generateColors(categoryLabels.length);

    setCategoryData({
      labels: categoryLabels,
      datasets: [{
        data: categoryValues,
        backgroundColor: categoryColors,
        borderWidth: 1
      }]
    });

    // Process monthly data
    const months = {};
    const currentDate = new Date();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthStr = format(month, 'MMM yyyy');
      months[monthStr] = 0;
    }

    expenses.forEach(expense => {
      const expenseDate = parseISO(expense.date);
      const monthStr = format(expenseDate, 'MMM yyyy');
      
      if (months[monthStr] !== undefined) {
        months[monthStr] += expense.amount;
      }
    });

    setMonthlyData({
      labels: Object.keys(months),
      datasets: [{
        label: 'Monthly Expenses',
        data: Object.values(months),
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1
      }]
    });
  };

  const generateColors = (count) => {
    const baseColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#8AC249', '#EA5545', '#F46A9B', '#EF9B20'
    ];
    
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Expense Categories',
        font: {
          size: 16
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
        font: {
          size: 16
        }
      }
    }
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="total-expenses">
        <h3>Total Expenses</h3>
        <p className="expense-total">${calculateTotalExpenses()}</p>
      </div>
      
      <div className="charts-container">
        <div className="chart pie-chart">
          {expenses.length > 0 ? (
            <Pie data={categoryData} options={pieOptions} />
          ) : (
            <p className="no-data">Add expenses to see category breakdown</p>
          )}
        </div>
        
        <div className="chart bar-chart">
          {expenses.length > 0 ? (
            <Bar data={monthlyData} options={barOptions} />
          ) : (
            <p className="no-data">Add expenses to see monthly trends</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;