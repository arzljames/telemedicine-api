const checkAuth = (req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect("/error")
    }
}


module.exports = checkAuth