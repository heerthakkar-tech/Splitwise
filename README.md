# Splitwise Clone 💸

A full-stack expense sharing application inspired by Splitwise where users can split expenses equally or percentage-wise, track balances, receive email notifications, and manage settlements.

## Features 🚀

### Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Logout functionality

### Email Features

- Welcome email on signup
- Expense notification emails
- Payment reminder emails using Cron Job (every 24 hours)

### Expense Management

- Create expenses
- Equal expense splitting
- Percentage-based expense splitting
- Automatic payer detection using authenticated JWT user
- Expense history tracking

### Settlement Logic

- Net settlement calculation
- Example:
  - Heer owes Varun ₹500
  - Varun owes Heer ₹300
  - Final settlement = Heer owes Varun ₹200

### Dashboard

- Total amount owed to you
- Total amount you owe
- Settlement summary
- Pending balances

### Frontend

- React + Vite frontend
- Protected routing
- Expense creation UI
- Custom member selection dropdown
- Percentage split UI
- Dashboard UI
- Authentication pages

---

## Tech Stack 🛠️

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- JWT Decode
- Plain CSS

### Backend

- Node.js
- Express.js
- MySQL
- JWT
- Bcrypt
- Nodemailer
- Node Cron
- Joi Validation

---

## Project Structure 📂

```bash
splitwise-clone/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── mailer.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── dashboardController.js
│   │   └── userController.js
│   │
│   ├── models/
│   │   ├── authModel.js
│   │   ├── expenseModel.js
│   │   ├── dashboardModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── validators/
│   │   └── validator.js
│   │
│   ├── services/
│   │   └── reminderService.js
│   │
│   ├── jobs/
│   │   └── reminderJob.js
│   │
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## Database Schema 🗄️

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Expenses Table

```sql
CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paid_by) REFERENCES users(id)
);
```

### Splits Table

```sql
CREATE TABLE splits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  expense_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  percentage DECIMAL(5,2) NULL,
  status ENUM('pending', 'paid') DEFAULT 'pending',
  FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Environment Variables 🔐

Create `.env` file in backend:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=splitwise

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## Installation ⚙️

### Clone Repository

```bash
git clone https://github.com/heethakkar-tech/splitwise-clone.git
cd splitwise-clone
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints 📡

### Auth

- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`

### Users

- GET `/users`

### Expenses

- POST `/expenses`

### Dashboard

- GET `/dashboard`

---

## Split Types Supported 💰

### Equal Split

Example:

```text
Amount = ₹1200
Members = Heer, Varun, Omkar

Result:
₹400 each
```

### Percentage Split

Example:

```text
Amount = ₹1200

Varun = 50%
Omkar = 30%
Creator auto gets remaining 20%

Result:
Varun = ₹600
Omkar = ₹360
Creator = ₹240
```

---

## Reminder Emails ⏰

Implemented using Node Cron:

- Runs every 24 hours
- Finds pending unpaid balances
- Sends reminder emails automatically

---

## Future Improvements 📌

- Group expense support
- Expense settlement button
- Payment tracking
- Real payment integration
- Profile management
- Charts and analytics

---

## Author 👨‍💻

Heer Thakkar

Built as an Training/project assignment using React, Node.js, Express, and MySQL.
