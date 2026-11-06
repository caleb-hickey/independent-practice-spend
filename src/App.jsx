import { useState } from 'react'
import './App.css'

// Mock data – replace later with real API calls
const initialExpenses = [
  {
    id: 1,
    description: 'Groceries',
    amount: 54.32,
    category: 'Food',
    date: '2026-11-01',
  },
  {
    id: 2,
    description: 'Gas fill-up',
    amount: 41.5,
    category: 'Transport',
    date: '2026-11-02',
  },
  {
    id: 3,
    description: 'Coffee with coworker',
    amount: 8.75,
    category: 'Food',
    date: '2026-11-03',
  },
]

const CATEGORIES = ['Food', 'Transport', 'Home', 'Entertainment', 'Other']

function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
  })
  const [editingId, setEditingId] = useState(null)

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  function resetForm() {
    setForm({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().slice(0, 10),
    })
    setEditingId(null)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const amountNum = Number(form.amount)
    if (!form.description.trim() || Number.isNaN(amountNum) || amountNum <= 0) {
      return
    }

    if (editingId !== null) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                description: form.description.trim(),
                amount: amountNum,
                category: form.category,
                date: form.date,
              }
            : item
        )
      )
    } else {
      const newExpense = {
        id: Date.now(),
        description: form.description.trim(),
        amount: amountNum,
        category: form.category,
        date: form.date,
      }
      setExpenses((prev) => [newExpense, ...prev])
    }

    resetForm()
  }

  function startEdit(expense) {
    setEditingId(expense.id)
    setForm({
      description: expense.description,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
    })
  }

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((item) => item.id !== id))
    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Practice Spend</h1>
        <p className="subtitle">
          Simple expense logger — currently using mock data
        </p>
      </header>

      <section className="summary">
        <span>Total tracked</span>
        <strong>${total.toFixed(2)}</strong>
      </section>

      <form className="form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Edit expense' : 'Add expense'}</h2>

        <label>
          Description
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What did you spend on?"
            required
          />
        </label>

        <div className="row">
          <label>
            Amount
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            {editingId ? 'Save changes' : 'Add expense'}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="list-section">
        <h2>Recent expenses</h2>

        {expenses.length === 0 ? (
          <p className="empty">No expenses yet. Add one above.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <div className="expense-main">
                  <div className="expense-title">{expense.description}</div>
                  <div className="expense-meta">
                    <span className="category">{expense.category}</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="expense-side">
                  <span className="amount">${Number(expense.amount).toFixed(2)}</span>
                  <div className="item-actions">
                    <button
                      type="button"
                      className="btn small"
                      onClick={() => startEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn small danger"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
