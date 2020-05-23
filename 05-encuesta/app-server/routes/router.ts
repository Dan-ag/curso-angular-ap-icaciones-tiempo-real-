import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Quiz } from '../classes/bar-graph';

const router = Router();

const graph = new Quiz();

router.get( '/quiz', ( req: Request, res: Response ) => {
  res.json( graph.getQuiz() );
} );

router.post( '/quiz', ( req: Request, res: Response ) => {

  const option = Number(req.body.option);
  const units = Number( req.body.units );

  const server = Server.instance;
  server.io.emit( 'vote', graph.increaseVotes( option, units ) );

  res.json( graph.getQuiz() );
} );

export default router;
