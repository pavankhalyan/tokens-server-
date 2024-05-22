import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/route.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('tiny'));

app.disable('x-powered-by'); 

const port = 8080;

app.get('/', (req,res) => {
    res.status(201).json("home get request");
})


app.use('/api',router);



connect().then(()=> {
    try {
        app.listen(port, () => {
           console.log(`server connected to http://localhost:${port}`);
        })
    } catch(error) {
        console.log('cannot connect to the server');
    }
}) .catch(error => {
    console.log( ' invalid database connection ..!');
}) 
    

