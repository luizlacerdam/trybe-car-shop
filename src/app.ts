import express from 'express';
import carsRoutes from './Routes/cars.routes';
import motocycleRouter from './Routes/motocycles.route';

const app = express();
app.use(express.json());
app.use('/motocycles', motocycleRouter);
app.use('/cars', carsRoutes);

export default app;