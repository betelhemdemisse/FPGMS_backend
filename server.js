require('dotenv').config();
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 8000;

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('📦 Database models synced successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Backend is running on http://localhost:${PORT}`);
      console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to sync database models:', err);
  });
