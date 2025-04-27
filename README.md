# Expense Tracker Application

A full-stack expense tracker application built with React, Node.js, Express, and MongoDB that allows users to manage their expenses and visualize spending patterns.

## Features

- Add, edit, and delete expense records
- View expenses in a list format
- Visualize expense data with interactive charts:
  - Pie chart for category distribution
  - Bar chart for monthly trends
- Responsive design for desktop and mobile devices

## Technologies Used

### Frontend
- React.js
- Chart.js for data visualization
- Axios for API requests
- date-fns for date formatting and manipulation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KalyanWaghchaure/expense-tracker.git
cd expense-tracker
```

2. Set up the backend:
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
```
Note: Update the MONGO_URI with your MongoDB connection string if using MongoDB Atlas.

4. Set up the frontend:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a separate terminal, start the frontend development server:
```bash
cd client
npm start
```

3. Open your browser and go to `http://localhost:3000`

## Project Structure

```
expense-tracker/
├── client/               # Frontend React application
├── server/               # Backend Node.js/Express application
├── README.md             # Setup instructions
└── architecture.md       # Architecture explanation
```

## API Endpoints

- `GET /expenses` - Get all expenses
- `POST /expenses` - Create a new expense
- `GET /expenses/:id` - Get a specific expense
- `PUT /expenses/:id` - Update an expense
- `DELETE /expenses/:id` - Delete an expense

## Future Enhancements

- User authentication
- Filtering and sorting expenses
- Expense categories management
- Export data functionality
- Dark mode theme

## License

This project is licensed under the MIT License
