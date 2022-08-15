const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Auth with google
// @rout GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        console.log("test google")
        // console.log(res)
        res.redirect('/dashboard')
    }
)

// @desc Logout user
// @route /auth/logout
//!Change: Passport 0.6 requires logout to be async  ***CREDIT TO  MAYANWOLFE***
router.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('https://accounts.google.com/o/oauth2/revoke?token="+ACCESS_TOKEN')
    })
})

module.exports = router