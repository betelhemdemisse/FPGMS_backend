const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: '*', // allow all origins for dev, replace with frontend URL in production
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());

// ===== ROUTES =====
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');

// All API routes under /api
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);

// ===== SWAGGER =====
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== HEALTH CHECK =====
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running 🚀' });
});

module.exports = app;
