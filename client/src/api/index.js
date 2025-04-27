// src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const createExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};