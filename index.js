const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/jwtAuth");
const dashboardRoutes = require("./routes/dashboard");
const path = require('path');
//middleware

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

//routes

app.use("/auth", authRoutes);

app.use("/users", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is starting on port 5000`);
});
