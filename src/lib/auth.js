module.exports = {

    //Metodo para protejer las vistas cuando el usuario no este registrado
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/login')
        }
    },
    //Metodo para ocultar las vistas cuando el usuario  este registrado
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/profile')
        }
    }

}