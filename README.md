# Practice Spend

A small personal expense logger used as a **practice project**.

## Current state

This repository contains a **fully working React frontend** that stores data in local component state (mock data).

Your task is to add a Spring Boot + JPA + MySQL backend and then connect the frontend to it.

### Frontend features (already working)

- List of expenses
- Add a new expense
- Edit an existing expense
- Delete an expense
- Running total

Each expense has:

- `id`
- `description`
- `amount`
- `category`
- `date`

### Intended backend (you will build)

- Spring Boot
- Spring Data JPA
- MySQL
- Single entity: `Expense`
- `ExpenseRepository` extending `JpaRepository`
- REST controller with basic CRUD endpoints
- No authentication, no extra relationships

Wire the React app to the real API **last**, after the backend is working and tested (Postman, browser, or curl).

## Running the frontend

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
practice-spend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx          ← main UI + mock data
    ├── App.css
    └── index.css
```

## Notes

This project is intentionally small. It exists only so you can practice the backend workflow (entity → repository → controller → MySQL → connect frontend) on something that is **not** your class final project.
