# Expense Tracker Application Architecture

This document outlines the architecture and data flow of the Expense Tracker application.

## System Overview

The Expense Tracker application follows a full-stack MERN (MongoDB, Express.js, React, Node.js) architecture with separate frontend and backend components communicating via RESTful API calls.

```
+----------------+         +------------------+         +------------------+
|                |         |                  |         |                  |
|  React         |  HTTP   |  Express.js      |  Query  |  MongoDB         |
|  Frontend      | <-----> |  Backend API     | <-----> |  Database        |
|                |         |                  |         |                  |
+----------------+         +------------------+         +------------------+
```

## Frontend Architecture

The React frontend follows a component-based architecture:

```
App.js
  ├── Header.js
  ├── Dashboard.js
  │     ├── Pie Chart (Categories)
  │     └── Bar Chart (Monthly trends)
  ├── ExpenseForm.js
  └── ExpenseList.js
        └── ExpenseItem.js (multiple)
```

### Component Responsibilities

- **App.js**: The main component that manages state and coordinates data flow between components
- **Header.js**: Simple header component for the application title
- **Dashboard.js**: Handles data visualization using Chart.js
- **ExpenseForm.js**: Handles adding and editing expenses
- **ExpenseList.js**: Displays the list of expenses
- **ExpenseItem.js**: Represents a single expense item with actions

### State Management

The application uses React's built-in state management with `useState` and `useEffect` hooks. Key state elements include:

- **expenses**: Array of all expense records
- **currentExpense**: Currently selected expense for editing
- **isEditing**: Boolean flag to toggle between add and edit modes
- **loading/error**: States for handling asynchronous operations

## Backend Architecture

The backend follows a Model-View-Controller (MVC) pattern:

```
server.js
  ├── models/
  │     └── Expense.js (Mongoose Schema)
  └── routes/
        └── expenses.js (API Endpoints)
```

### API Endpoints

- **GET /expenses**: Retrieve all expenses
- **POST /expenses**: Create a new expense
- **GET /expenses/:id**: Retrieve a specific expense
- **PUT /expenses/:id**: Update an expense
- **DELETE /expenses/:id**: Delete an expense

## Data Model

The core data entity in the application is the `Expense` which has the following structure:

```
Expense {
  _id: ObjectId,
  amount: Number,
  category: String,
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Data Flow

1. **Creating an Expense**:
   - User fills out ExpenseForm
   - Form data is sent to backend API via POST request
   - Backend saves the data to MongoDB
   - Frontend refreshes the expense list

2. **Editing an Expense**:
   - User clicks "Edit" on an ExpenseItem
   - Selected expense data populates the ExpenseForm
   - User modifies and submits the form
   - Form data is sent to backend API via PUT request
   - Backend updates the data in MongoDB
   - Frontend refreshes the expense list

3. **Deleting an Expense**:
   - User clicks "Delete" on an ExpenseItem
   - Frontend sends DELETE request to the backend API
   - Backend removes the expense from MongoDB
   - Frontend refreshes the expense list

4. **Visualization**:
   - On page load or data changes, expense data is processed
   - Data is transformed into appropriate format for charts
   - Charts are rendered using Chart.js

## Technologies Used

- **Frontend**:
  - React.js for UI components
  - Chart.js for data visualization
  - Axios for HTTP requests
  - CSS for styling

- **Backend**:
  - Node.js runtime
  - Express.js framework
  - Mongoose ODM for MongoDB
  - CORS middleware for cross-origin requests

- **Database**:
  - MongoDB for data storage

## Security Considerations

- Data validation is performed on both client and server sides
- CORS is configured to restrict API access to known origins
- Error handling is implemented to prevent sensitive information leakage

## Scalability Considerations

- The application can be enhanced with user authentication
- Database indexing can be added for improved performance with large datasets
- The frontend can be optimized with pagination for large expense lists
