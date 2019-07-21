const express  =  require('express'),
    app        =  express(),
    hbs        =  require('express-handlebars'),
    path       =  require('path'),
    flash      =  require('connect-flash'),
    morgan     =  require('morgan'),
    session    =  require('express-session'),
    passport   =  require('passport'),
    mySQLstore =  require('express-mysql-session'),
    {database} =  require('./keys'),
    {isLoggedIn} =  require('./lib/auth'),
    PORT = process.env.PORT || 8082;


//Initialization handlebars
app.set('views', path.join(__dirname, '/views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Settings
app.set('view engine', '.hbs')
require('./lib/passport')


//Middlewares
app.use(flash())
app.use(session({
    secret            : 'juankmastersession',
    resave            : false,
    saveUninitialized : false,
    store             : new mySQLstore(database)

}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

//Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next()
})


//Routes
app.use(require('./Router'));
app.use('/links',isLoggedIn, require('./Router/links'));
app.use(require('./Router/validations'));






//Starting Server
app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)
})