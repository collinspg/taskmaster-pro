const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google/url', (req, res) => {
  const url = passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })(req, res);
  res.json({ url });
});

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/api-docs?auth=failed',
    successRedirect: '/api-docs?auth=success',
    session: true 
  })
);

router.get('/current', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.status(401).json({ error: 'No autenticado' });
});

module.exports = router;