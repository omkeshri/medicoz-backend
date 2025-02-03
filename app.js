const express = require("express");
const cors = require("cors");
require('dotenv').config();
// Import the routes
// const razorpayRoutes = require("./routes/razorpayRoutes");
const authRouter = require("./routes/authRoutes");
const googleApiRouter = require("./routes/googleapi");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "*",
  maxAge: 600,
  credentials: true,
}));

// Use the routes
// app.use("/api/razorpay", razorpayRoutes); // Prefix for Razorpay routes
app.use("/", authRouter); // Prefix for Login/Signup routes
app.use("/", googleApiRouter); // Prefix for Login/Signup routes

// Start server on a single port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
