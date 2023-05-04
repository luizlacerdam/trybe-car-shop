import 'dotenv/config';
import App from './app';
import connectToDatabase from './Models/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase();
new App().start(PORT);
