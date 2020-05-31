import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { connectedUsers } from '../sockets/socket';


const router = Router();

router.get( '/message', ( req: Request, res: Response ) => {
  res.json( {
    ok: true,
    message: 'Todo esta bien!'
  } );
} );

router.post( '/message', ( req: Request, res: Response ) => {

  const body = req.body.message;
  const from = req.body.from;

  const payload = {
    from,
    body
  };

  const server = Server.instance;
  server.io.emit( 'newMessage', payload );

  res.json( {
    ok: true,
    message: 'All rigth!',
    body,
    from
  } );
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
