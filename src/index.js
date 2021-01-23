const express = require('express');
const cors = require('cors'); // allows access to server

const port = process.env.port;
require('./db/mongoose');
const usersRouter = require('./routers/usersRouter')

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);

// app.get('/users' , async(req,res)=>{

// })

app.listen(port, () => {
    console.log('Server connected, port:', port);
})
