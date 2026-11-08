# Gatekeeper — Role-Based Authentication System

A full-stack authentication system built with React, Node.js, Express.js and MongoDB, featuring JWT-based authentication and role-based access control.

## 🚀 Features

- User Registration and Login
- Secure Password Hashing using bcrypt
- JWT-based Authentication
- Role-Based Access Control (User, Manager, Admin)
- Protected Frontend Routes
- Backend Authorization Middleware
- MongoDB Database Integration
- User Profile Dashboard
- Secure Logout Functionality

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- React Router

**Backend**
- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs
- Mongoose

**Database**
- MongoDB

## 📁 Project Structure

```text
Gatekeeper/
├── Backend/
│   ├── configure/
│   ├── controllers/
│   ├── Middleware/
│   ├── Routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── Pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Gatekeeper
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder:

```env
PORT=5100
MONGO_URI=mongodb://127.0.0.1:27017/gatekeeper
JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=15m
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a separate terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local frontend URL provided by Vite.

## 🔐 Role-Based Access Control

| Role | Access |
|---|---|
| User | User Dashboard |
| Manager | Manager Dashboard |
| Admin | Admin Dashboard |

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/protected/me` | Get protected user profile |
| GET | `/api/protected/admin` | Admin-only endpoint |
| GET | `/api/health` | API health check |

## 🧪 Security Testing

- Verified JWT authentication.
- Tested protected API endpoints.
- Verified User access restrictions.
- Verified Manager access restrictions.
- Verified Admin authorization.
- Tested logout and token removal.

## 👨‍💻 Developer

**Vansh Verma**

Full Stack Development Project

---

*Built as a Role-Based User Authentication and JWT Microservice project.*