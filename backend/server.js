require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const taskRoutes = require("./routes/taskRoutes");


// Middleware
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());  // ✅ Add this to parse JSON
app.use(express.urlencoded({ extended: true }));  // ✅ For form data
app.use("/api", taskRoutes);
// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
