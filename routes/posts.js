import { Router } from 'express';
const router = Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // return res.render('posts');
  return res.send('Bienvenue sur la page des articles de blog !');
});

export default router;
