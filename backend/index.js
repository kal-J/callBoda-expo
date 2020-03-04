const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodaRoutes = require('./routes/bodaRoutes');

const app = express();
app.use(cors());
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log('Server is running...') });