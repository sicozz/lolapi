import UserDAO from '../services/user.js';

const authenticator = priviledges => async (req, res, next) => {
  try {
    const user = await UserDAO.findUser(req.session.user);
    if (priviledges.includes(user.priviledges)) {
      next();
    } else {
      res.json("User is not authorized")
    }
  } catch (err) {
    next(err);
  }
};

export default authenticator;
