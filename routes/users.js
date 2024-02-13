import { Router } from 'express';
const router = Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  // return res.render('login');
  return res.send('Bienvenue sur la page de connexion... Travail en cours !');
});

export default router;
