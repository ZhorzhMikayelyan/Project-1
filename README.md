# Pet Tracker Application 🐾

This is a simple full-stack application for managing pets and their feeding history.  
The project is built with **Node.js + Express** on the backend and **Vite + React** on the frontend.

> ⚠️ **Note**: The application may include labels or text in Russian. This does not affect functionality.

---

## 🔧 Requirements

- Node.js (v18+ recommended)
- npm or yarn

---

## 🗂 Project Structure

```
Project-1-Rl/
│
├── backend/           # Express server (API)
│   └── app.js, routes/, models/, ...
│
├── frontend/          # Vite + React frontend
│   └── src/, public/, ...
```

---

## 🚀 How to Run the Project

### 1. Start the Backend Server

```bash
cd backend
npm install
node app.js
```

The backend will run on:  
`http://localhost:3000`

---

### 2. Start the Frontend Server

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:  
`http://localhost:5173`

---

## 🌐 Access the App

Once both servers are running, open your browser and go to:  
[http://localhost:5173](http://localhost:5173)

You can interact with pets, view feeding history, and test CRUD functionality.

---

## 📌 Notes

- The frontend communicates with the backend via REST API.
- All pet data is stored server-side using in-memory structures or files (depending on implementation).
- This project was created as a university assignment and demonstrates backend and frontend integration with basic CRUD operations.

---

## 🧪 Testing

You can test:
- Adding pets
- Editing pet details
- Logging feedings
- Deleting pets
- Viewing data updates live in the UI
