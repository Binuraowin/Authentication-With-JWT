const express = require('express');
const app = express();

const route = require('./routes/auth');


app.use('/user',route)

app.listen(3000, () => console.log("runing"));