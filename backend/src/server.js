const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');  

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/forms', formRoutes);   

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});