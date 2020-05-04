import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';


// Enviroments
import { SERVER_PORT } from './global/enviroment';

// Routers
import router from './routes/router';

const server = new Server();

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// Cors
server.app.use( cors({ origin:true, credentials: true }) );

// Routers
server.app.use('/', router)


server.start( () => {
  console.log(`Servidor corriendo en el puerto ${ SERVER_PORT }`);
} )