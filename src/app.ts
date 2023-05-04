// import express from 'express';
// import carsRoutes from './Routes/cars.routes';
// import motorcycleRouter from './Routes/motorcycles.route';

// const app = express();
// app.use(express.json());
// app.use('/motorcycles', motorcycleRouter);
// app.use('/cars', carsRoutes);

// export default app;
import express from 'express';
import motorcycleRouter from './Routes/motorcycles.route';
import carsRoutes from './Routes/cars.routes';
import ErrorHandler from './Middlewares/error.middleware';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(express.json());
    this.app.use('/motorcycles', motorcycleRouter);
    this.app.use('/cars', carsRoutes);
    this.app.use(ErrorHandler.errorMiddleware);
  }
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}