const express = require('express');

const routerApi = require("./routes/index")

const {errorHandler,logErrors,boomerrorHandler} =require("./middlewares/error.handler")

const { faker } = require("@faker-js/faker")

const app = express();

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
});


routerApi(app)

app.use(logErrors);
app.use(boomerrorHandler)
app.use(errorHandler)







app.get('/users', (req, res) => {

    const { limit, offset } = req.query;


    if (limit && offset) {
        res.json(
            {
                limit,
                offset
            });
    }

    else res.send("No hay valores")



});



app.get('/categories/:categoryId/products/:productId', (req, res) => {

    const { categoryId, productId } = req.params;
    res.json(
        {

            categoryId,
            productId
        });
});




const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
