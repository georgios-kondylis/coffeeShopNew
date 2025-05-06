// Server.js
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./mongoDB/connectToMongoDB.js";
import userRoutes from "./routes/UserRoutes.js";
import productsRoutes from "./routes/ProductsRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import Product from "./mongoDB/productsSchema.js";
import orderRoutes from "./routes/Order.js";
import reviewsRoutes from './routes/ReviewsRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/reviews', reviewsRoutes);

const startServer = async () => {
  await connectToMongoDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Yoo Server is running on port ${process.env.PORT || 5000}`);
  });
};

startServer();

