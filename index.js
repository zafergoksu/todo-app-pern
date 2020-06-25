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
//routes

app.use("/auth", authRoutes);

app.use("/users", dashboardRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        
    });
}

app.listen(port, () => {
  console.log(`Server is starting on port 5000`);
});
