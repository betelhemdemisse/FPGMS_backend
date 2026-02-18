const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router;
