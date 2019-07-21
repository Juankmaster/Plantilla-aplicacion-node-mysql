const router = require('express').Router(),
    passport = require('passport'),
    { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//Rutas para creacion de nuevo usario
router.get('/signup', isNotLoggedIn,(req, res) => {
    res.render('auth/signup');

})

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

//Rutas para login
router.get('/login',isNotLoggedIn, (req, res) => {
    res.render('auth/login');

})

router.post('/login',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)

});



router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');

})


router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/login')

})


module.exports = router;