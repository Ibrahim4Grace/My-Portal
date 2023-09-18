//to prevent going back without signing

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            // no caache so when logged out, cant browser back button to reload page, forces reload
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            return next();
        }
        req.flash('error_msg', 'Please login ');
        res.redirect('/users/login');
    }
}