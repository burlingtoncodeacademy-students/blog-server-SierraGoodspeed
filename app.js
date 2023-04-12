// app.js
const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const outs = require('./controllers/Routes');
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', outs);


app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
