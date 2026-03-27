import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body

    const session = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.CLIENT_URL}/success`,
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

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
