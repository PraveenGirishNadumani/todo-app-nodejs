'use strict';
const express = require('express');
const mongoose = require('mongoose');
const restApis = require('./apiRouter');
const todoController = require('./controller/todo');

const PORT = 3000; //port number for the server

/**Connection to mongodb data base */
(async () => {
    try {
        const mongoUrl = 'mongodb+srv://schedules:schedules@cluster0.wg1yd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true  });   
    } catch (error) {
        console.log(`Catch error while connecting to mongoose ${error}`);
        process.exit(-1);
    }
})();

/**express middleware */
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('./public'));

/**Rendering UI */
app.get('/', async(req, res) => {
    const todo = await todoController.getTodoList();
    return res.render('todo',{todos: todo});
});

/**API routes */
app.use('/api', restApis);

app.listen(PORT);
console.log(`App started on the port number: ${PORT}`);