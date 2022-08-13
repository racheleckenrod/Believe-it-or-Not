const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc Login/Landing page
// @rout GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard
// @rout GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    console.log("test dashboard")
    res.render('dashboard')
})

module.exports = router