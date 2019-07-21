const router = require('express').Router(),
   pool = require('../database');

router.get('/add', (req, res) => {
   res.render('links/add')
});

router.post('/add', async(req, res) => {
   const { title, url, description } = req.body,
      newLink = {
         title,
         url,
         description,
         id_user : req.user.id
      }

  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'Link saved succesfully');
  res.redirect('/links');
});

router.get('/edit/:id', async(req, res) => {
   
   const id   = req.params.id;
   const link = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);

   res.render('links/edit', { link : link[0] });
});

router.post('/edit/:id', async(req, res) => {
   const {title, url, description} = req.body,
        id = req.params.id,
         links = {
            title,
            url,
            description
         };

   await pool.query('UPDATE links SET ? WHERE ID = ?',[links, id ]); 
   req.flash('success', 'Link update succesfully');
   res.redirect('/links');     

});

router.get('/delete/:id', async(req, res) => {
   const id = req.params.id;
   await pool.query('DELETE FROM links WHERE id = ?',[id]);
   req.flash('success', 'Link delete succesfully');
   res.redirect("/links");
});

router.get('/', async(req, res) => {
  const links = await pool.query('SELECT * FROM links WHERE id_user =?',[req.user.id]);
   res.render('links/list', { links } );
});

module.exports = router;