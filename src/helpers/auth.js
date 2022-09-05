import jwt from 'jsonwebtoken';

const auth = (priviledges) => async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      if (priviledges.includes(user.priviledges)) {
        req.user = user;
        return next();
      }
      res.json('User is not authorized');
    });

  } catch (err) {
    next(err);
  }
};

export default auth;
