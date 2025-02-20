import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from 'dotenv';

dotenv.config()


passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APPID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ["id", "displayName", "emails", "picture.type(large)"],
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

export default passport;