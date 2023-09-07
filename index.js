const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const {notFound,errorHandler} = require('./middlewares/errorHandler');

const app = express();

// const authRouter = require('./routes/authRoute');
const authRouter = require('./routes/authRoute');

dbConnect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/',(req,res)=>{
//     res.send('Hello World');
// })

app.use('/api/user',authRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    });