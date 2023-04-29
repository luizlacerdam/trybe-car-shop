import express from 'express';
import carsRoutes from './Routes/cars.routes';
import motorcycleRouter from './Routes/motorcycles.route';

const app = express();
app.use(express.json());
app.use('/motorcycles', motorcycleRouter);
app.use('/cars', carsRoutes);

export default app;