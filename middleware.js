module.exports.isActivePage = (req, res, next) => {
    res.locals.activePage = req.path;

    res.locals.activeAttr = function (page){
        return res.locals.activePage === page
        ? `class="nav-link active" aria-current="page"`
        : `class="nav-link"`;
    };

    next();
}

module.exports.checkLogin = ((req, res, next) => {
    res.locals.isLogged = req.oidc.isAuthenticated();
    next();
});