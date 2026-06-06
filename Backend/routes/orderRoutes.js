const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getDashboardStats,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/", auth, getOrders);

router.put("/:id", auth, updateOrderStatus);

router.get("/dashboard/stats", auth, getDashboardStats);

module.exports = router;