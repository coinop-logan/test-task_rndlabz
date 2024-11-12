// index.ts
import * as express from 'express';
import * as dotenv from 'dotenv';
import { getPrice } from './controllers/PriceController'; // Adjust this import path as needed

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // should be changed for production
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Define a route to test your controller
app.get('/api/price/:id', getPrice); // Example route, adjust as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
