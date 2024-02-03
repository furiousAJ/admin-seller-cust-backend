const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Connection/Database');
const sellerAuthRoutes = require('./routes/sellerAuth');
const categoryRouter = require('./routes/addcategory');
const productRouter = require('./routes/productnew');
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth'); // Import Admin authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/auth', authRoutes);
app.use('/sellerAuth', sellerAuthRoutes);
app.use('/adminAuth', adminAuthRoutes); // Use Admin authentication routes

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
