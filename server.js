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


app.get('/api/checkout-session/:id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id)
    res.json(session)
  } catch (err) {
    console.error('Fetch session error:', err)
    res.status(500).json({ error: 'Failed to fetch session' })
  }
})


app.post('/api/create-order-from-session', async (req, res) => {
  try {
    const { sessionId } = req.body

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' })
    }

    const orders = readOrders()

    // prevent duplicate order
    const exists = orders.find(o => o.stripeSessionId === sessionId)
    if (exists) {
      return res.json({ order: exists, message: 'Order already exists' })
    }

    const items = JSON.parse(session.metadata?.items || '[]')

    const newOrder = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      stripeSessionId: sessionId,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email || null,
      currency: session.currency,
      amountTotal: session.amount_total,
      orderStatus: 'processing',
      items
    }

    orders.push(newOrder)
    writeOrders(orders)
    await sendOrderEmail(newOrder)

    res.json({ order: newOrder })
  } catch (err) {
    console.error('Create order error:', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})


async function sendOrderEmail(order) {
  try {
    if (!process.env.EMAIL_HOST) {
      console.log('Email not configured, skipping email send')
      return
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: order.customerEmail,
      subject: 'Order Confirmation – Minoki Cats',
      text: `Thank you for your order.\n\nOrder ID: ${order.id}\nAmount: $${(order.amountTotal / 100).toFixed(2)}\n\nWe will begin processing your order shortly.`,
    })

    console.log('Order email sent:', order.id)
  } catch (err) {
    console.error('Email send error:', err)
  }
}

