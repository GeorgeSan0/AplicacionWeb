const express = require('express')
const app = express()

const hbs = require('hbs');

const cors = require('cors');


const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.urlencoded({extend:false}));
app.use(express.json());

//3 - invocamos al doten    
const dotenv= require('dotenv');
dotenv.config({path:'./env/.env'});

//4 - el directorio public
app.use(express.static('/public'));
app.use(express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantilla ejs
app.set('view engine','ejs')

//6 -Invocamos a brcrypt.js
const bcryptjs =require('bcryptjs')

//7- var de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true 
}))

//8 - Invocamos al moduleo de conexicon de DB
const connection=require('./database/db')

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
//9 - Estableciendo las rutas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/registro', (req, res) => {
    res.render('registro');
});

app.get('/slider', (req, res) => {
    res.render('slider');
});

app.get('/cuento1', (req, res) => {
    res.render('cuento1');
});

app.get('/cuento2', (req, res) => {
    res.render('cuento2');
});

app.get('/cuento3', (req, res) => {
    res.render('cuento3');
});

app.get('/juego1', (req, res) => {
    res.render('juego1');
});

app.get('/juego2', (req, res) => {
    res.render('juego2');
});

app.get('/juego3', (req, res) => {
    res.render('juego3');
});

//10 -Registracion
app.post('/registro', async (req,res)=>{
    const user = req.body.user;
    const correo = req.body.correo;
    const pass = req.body.pass;
    const telefono = req.body.telefono
    connection.query('Insert into tbllogin SET ?',{usuario:user ,correo:correo ,pass:pass ,telefono:telefono}, async (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('home');
        }
    })
})
//11 - Autenticacion
app.post('/auth', async (req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if(user && pass){
        connection.query('SELECT * FROM tbllogin WHERE usuario = ? and pass=?',[user,pass], async(error,results)=>{
            if(results.length ==0){
                
            }else{
                console.log(results);
                res.render('slider');
            }
        })
    }else{
        res.send('por favor ingrese un usuario y/o password')
    }
})



//mostrar todos los datos de tbtcuento


//mostrar todos los datos de tbtcuento
app.get('/api/tbtcuento',( req,res)=>{
    connection .query('Select *from tbtcuento', (error,filas)=>{
        if (error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

app.listen(port, () =>{
    console.log(`Escuchando peticiones en el puerto ${port}`)
});

