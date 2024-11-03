// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./server.js";

dotenv.config();
// require('dotenv').config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const mongoURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster-example.yvtao.mongodb.net/?retryWrites=true&w=majority&appName=cluster-example`;

// Connect to MongoDB

const PORT = process.env.PORT || 8000;


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
export default connectDB;