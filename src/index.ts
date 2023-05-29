import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { Error } from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())

const server = http.createServer(app)
const port = process.env.SERVER_PORT

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.cipi03e.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error)
);