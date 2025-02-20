import express from 'express';
import passport from 'passport';

const router = express.Router();

// Facebook Login Route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook Callback Route
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/',session : false }),
    (req, res) => {
        res.json({ message: 'Facebook Login Successful', user: req.user });
    }
);

export default router;
