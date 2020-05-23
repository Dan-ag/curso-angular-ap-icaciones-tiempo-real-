import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/socket';
import { GraphData } from '../classes/graph';

const router = Router();

const graph = new GraphData();

router.get( '/graph', ( req: Request, res: Response ) => {
  // res.json( {
  //   ok: true,
  //   message: 'Todo esta bien!'
  // } );

  res.json( graph.getDataGraph() );
} );

router.post( '/graph', ( req: Request, res: Response ) => {

  const month = req.body.month;
  const units = Number( req.body.units );

  const server = Server.instance;
  server.io.emit( 'change-graph', graph.increaseValue( month, units ) );

  res.json( graph.getDataGraph() );
} );

router.post( '/message/:id', ( req: Request, res: Response ) => {

  console.log( req.body );

  const body = req.body.message;
  const from = req.body.from;
  const id = req.params.id;

  const payload = {
    from,
    body
  };

  const server = Server.instance;
  server.io.in( id ).emit( 'privateMessage', payload );

  res.json( {
    ok: true,
    message: 'All rigth!',
    body,
    from,
    id
  } );
} );

// Get all Ids users
router.get( '/users', ( req: Request, res: Response ) => {

  const server = Server.instance;
  server.io.clients( ( err: any, clients: string ) => {
    if ( err ) {
      return res.json( {
        ok: false,
        err
      } );
    }

    res.json( {
      ok: true,
      clients
    } );
  } );

} );

// get users and names
router.get( '/users/details', ( req: Request, res: Response ) => {

  const server = Server.instance;
  server.io.emit( 'activeUsers', connectedUsers.getList() );

  res.json( {
    ok: true,
    clients: connectedUsers.getList()
  } );

} );

export default router;
