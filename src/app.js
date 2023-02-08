
const PATH = './ProductManager01.json'

import express from 'express';
import * as fs from 'fs';
let app = express()
//app.use(urlencoded({extended:true}));

async function cargaProductos(){
    let productos =  fs.promises.readFile(PATH, 'utf-8')
    return productos;
}



app.get('/products',(req,res)=>{
    //recomendacion fuerte: enviar datos como objetos en lugar de array
    //para meter más info en el futuro y no haya que cambiar el tipo
    //de respuesta de lado del cliente
    let isLoading = true;
    console.log('Está cargando...')
    cargaProductos()
    .then((productos)=>{
        let productosJSON = JSON.parse(productos);
        isLoading = false;
        console.log('Carga finalizada')
        console.log(productosJSON)
        let {limit} = req.query;
        console.log('limit es '+limit)
        let productosLimite = limit ? productosJSON.slice(0,limit) : productosJSON;
        res.send({productosLimite});
    }).catch((error)=>console.log(error))
})


app.get('/products/:pid', async (req,res)=>{
    let isLoading = true;
    console.log('Está cargando...')
    cargaProductos()
        .then((productos)=>{   
        let productosJSON = JSON.parse(productos);     
        isLoading = false;
        console.log('Carga finalizada')
        let productID = req.params.pid;
        let productoFiltrado = productosJSON.filter(producto=>producto.id == productID);
        res.send({productos:productoFiltrado});
    }).catch((error)=>console.log(error))
})


//escucha si se levantó el servidor en algún puerto con app.listen
app.listen(8080,()=>{
        console.log("Servidor arriba en puerto 8080");
    }
)
//el segundo argumento es un callback

