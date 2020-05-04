import{ Router, Request, Response } from 'express';

 
const router = Router();


router.get( '/mensajes', ( req: Request, res: Response ) => {
  res.json( {
    ok: true,
    message: 'Todo esta bien!'
  })
} )

router.post( '/mensajes', ( req: Request, res: Response ) => {

  const body = req.body.cuerpo;
  const de =req.body.de;


  res.json( {
    ok: true,
    message: 'Todo esta bien!',
    body,
    de
  } );
} )

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

  console.log(req.body);

  const body = req.body.cuerpo;
  const de = req.body.de;

  const id = req.params.id;

  res.json( {
    ok: true,
    message: 'Todo esta bien!',
    body,
    de,
    id
  } );
} )

export default router;
