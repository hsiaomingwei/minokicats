import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const ordersFile = path.join(process.cwd(), 'data', 'orders.json')
const usersFile = path.join(process.cwd(), "data", "users.json")
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body

    const session = await stripe.checkout.sessions.create({
      metadata: {
        items: JSON.stringify(items)
      },
      metadata: {
        items: JSON.stringify(items)
      },
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error:', err)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/orders', (_req, res) => {
  res.json(readOrders())
})

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

function readOrders() {
  try {
    const data = fs.readFileSync(ordersFile, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Read orders error:', err)
    return []
  }
}

function writeOrders(orders) {
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  } catch (err) {
    console.error('Write orders error:', err)
  }
  }
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    console.error("Read users error:", err)
    return []
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
  } catch (err) {
    console.error("Write users error:", err)
  }
}


app.post("/api/register", (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password required" })
    }

    const users = readUsers()

    const exists = users.find(u => u.email === email)
    if (exists) {
      return res.status(400).json({ error: "User already exists" })
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    writeUsers(users)

    res.json({ user: newUser })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ error: "Failed to register user" })
  }
})

app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const users = readUsers()

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    res.json({ user })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Failed to login" })
  }
})


app.put("/api/users/:id", (req, res) => {
  try {
    const { id } = req.params
    const { name, address } = req.body

    const users = readUsers()
    const index = users.findIndex((u) => u.id === id)

    if (index === -1) {
      return res.status(404).json({ error: "User not found" })
    }

    const existingUser = users[index]

    const updatedUser = {
      ...existingUser,
      name: typeof name === "string" ? name : existingUser.name,
      address: typeof address === "string" ? address : existingUser.address || ""
    }

    users[index] = updatedUser
    writeUsers(users)

    res.json({ user: updatedUser })
  } catch (err) {
    console.error("Update user error:", err)
    res.status(500).json({ error: "Failed to update user" })
  }
})
