import{ Router, Request, Response } from 'express';
import Server from '../classes/server';

 
const router = Router();


router.get( '/message', ( req: Request, res: Response ) => {
  res.json( {
    ok: true,
    message: 'Todo esta bien!'
  })
} )

router.post( '/message', ( req: Request, res: Response ) => {

  const body = req.body.message;
  const from = req.body.from;
  
  const payload = {
    from,
    body
  }

  const server = Server.instance;
  server.io.emit( 'newMessage', payload );

  res.json( {
    ok: true,
    message: 'Todo esta bien!',
    body,
    from
  } );
} )

router.post( '/message/:id', ( req: Request, res: Response ) => {

  console.log(req.body);

  const body = req.body.message;
  const from = req.body.from;
  const id = req.params.id;

  const payload = {
    from,
    body
  }

  const server = Server.instance;
  server.io.in( id ).emit( 'privateMessage', payload )

  res.json( {
    ok: true,
    message: 'Todo esta bien!',
    body,
    from,
    id
  } );
} )

export default router;
