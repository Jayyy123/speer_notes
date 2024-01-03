// middleware/authentication.js

const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

/**
 * Passport JWT strategy for user authentication.
 * @type {JwtStrategy}
 */
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    (payload, done) => {
      // You might want to implement logic to fetch the user from the database based on the payload
      const user = { id: payload.sub, username: payload.username };

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

/**
 * Authentication middleware for validating JWT tokens.
 * @type {express.RequestHandler}
 */
const exempted = ["/api/auth/signup", "/api/auth/login"]
const authenticateJWT = (req, res, next) => {
  if (exempted.includes(req.originalUrl)) {
    return next();
  }
  console.log("Authent", req.Authorization)
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    console.log(user);
    if (!user) {
      return res.status(401).json({error:true, message: 'Unauthorized Access' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authenticateJWT;
