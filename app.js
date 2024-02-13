import 'dotenv/config';
import path from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
import favicon from 'serve-favicon';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import lessMiddleware from 'less-middleware';
import express, { json, urlencoded } from 'express';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import clientPromise from './data/index.js';


const app = express();
const PORT = 3000;
const HOST = 'localhost';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoOptions = {
  clientPromise,
  dbName: 'diwjs'
};
const mongoStore = MongoStore.create(mongoOptions);
// const upload = multer({ dest: 'uploads/' });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'my-super-secret',
  saveUninitialized: false, // ne crée pas de session tant qu'il n'y a rien à stocker
  resave: false, // ne sauvegarde pas la session si rien n'a été modifié
  crypto: {
    secret: 'diwjs-promotion-17'
  },
  store: mongoStore
}));
app.use(logger('dev'));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'public', 'stylesheets')));
app.use('/scripts', express.static(path.join(__dirname, 'public', 'javascripts')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// INSERER ICI LE CODE DE VOS ROUTES...




// NE RIEN ECRIRE APRES CE COMMENTAIRE

// GESTIONNAIRE D'ERREURS STANDARD
app.use((req, res, next) => {
  return next(createError(404));
});

// GESTIONNAIRE DES ERREURS AUTRES QUE 404
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  return res.render('error');
});

app.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`);
});

export default app;
