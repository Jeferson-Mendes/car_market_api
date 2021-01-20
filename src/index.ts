import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import path from 'path';

import routes from './routes';

dotenv.config()

if(!process.env.PORT){
    console.log('Error to get PORTS');

    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes)

// Connect to mongoose

import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/market_car_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> {
    console.log('Database has ben connected')
}).catch(err => {
    console.log('Fail to connect database...', err)
})

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const server = app.listen(PORT, ()=> {
    console.log('App running in port ', PORT)
})

app.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));