import "./alias";
import "@/config";
import express, { Errback, Request, Response } from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser'
import winston from 'winston';
import routes from '@/routes';
import path from "path";
import { ResponseError } from '@/types/error';

const app = express();
app.use(expressWinston.logger({
  transports: [
    process.env.NODE_ENV !== 'test' ?
      new winston.transports.Console() :
      new winston.transports.File({filename: 'test.log', dirname: 'tmp'})
  ],
  ignoredRoutes: ['/health_check'],
  meta: true,
  expressFormat: true
}))
app.use(bodyParser.urlencoded({ limit: process.env.BODY_LIMIT_SIZE || '50mb', extended: true }));
app.use(bodyParser.json({ limit: process.env.BODY_LIMIT_SIZE || '50mb' }));
routes.init(app);

app.use((err: ResponseError, req: Request, res: Response, next: Errback) => {
  console.error(req.method, req.path, err)
  if (res.headersSent) {
    return next(err)
  }
  return res.status(err.statusCode || 500).json({errors: [err.message]})
})

app.set('views', path.join(process.cwd(), 'src/views'))
app.set('view engine', 'ejs')

app.get('/', (_: Request, res: Response) => {
  res.render('index')
});

export default app;
