import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('tiny'));

app.disable('x-powered-by'); 

const port = 8080;

app.get('/', (req,res) => {
    res.status(201).json("home get request");
})

app.listen(port, () => {
   console.log(`server connected to http://localhost:${port}`);
})