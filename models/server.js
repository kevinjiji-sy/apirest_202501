const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/MySqlConnection');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        
        this.pathsMySql = {
            //auth: '/api/auth',
            heroes: '/api/heroes',
            peliculas: '/api/peliculas',
            protagonistas: '/api/protagonistas'
        }
            

        /*
        this.app.get('/', function (req, res) {
            res.send('Hola Mundo a todos... como estan...')
        })
        */    
        

        //Aqui me conecto a la BD
        this.dbConnection();


        //Middlewares
        this.middlewares();


        //Routes
        this.routes();

    }


    
    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }
    

    
    routes() {


        /*
        this.app.get('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'get API'
               })

        });

        this.app.post('/api', (req, res) => {
            //res.send('Hello World')
            res.status(201).json({ok:true,
                msg:'post API'
               })

        });

        this.app.put('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'put API'
               })

        });

        this.app.delete('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'delete API'
               })

        });

        this.app.patch('/api', (req, res) => {
            //res.send('Hello World')
            res.json({
                ok:true,
                msg:'patch API',
                status:'Status OK...'
               })

        });
        */
                   
        //this.app.use(this.pathsMySql.auth, require('../routes/MySqlAuth'));
        this.app.use(this.pathsMySql.heroes, require('../routes/heroes.route'));
        this.app.use(this.pathsMySql.peliculas, require('../routes/peliculas.route'));
        this.app.use(this.pathsMySql.protagonistas, require('../routes/protagonistas.route'));

        

    }
    


    
    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());

        //Lectura y Parseo del body
        //JSON        
        //JSON (JavaScript Object Notation)
        //es un formato ligero de intercambio de datos.
        //JSON es de fácil lectura y escritura para los usuarios.
        //JSON es fácil de analizar y generar por parte de las máquinas.
        //JSON se basa en un subconjunto del lenguaje de programación JavaScript,
        //Estándar ECMA-262 3a Edición - Diciembre de 1999.
        this.app.use(express.json());


        //Directorio publico
        this.app.use(express.static('public'));


    }
    


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;
