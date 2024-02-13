import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.render('index',
    {
      title: 'Diwjs Blog'
    }
  );
});

export default router;
