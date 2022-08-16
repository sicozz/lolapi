import UserDAO from '../services/user.js'
import priviledges from '../helpers/priviledges.js';

const signin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const passwd = req.body.password;
    const priviledge = priviledges.user;
    const user = {
      username: username,
      passwd: passwd,
      priviledges: priviledge
    }
    const id = await UserDAO.create(user);

    if (id) {
      res.json({ id });
    } else {
      throw new Error(`signin failed`);
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const passwd = req.body.password;
    const resp = await UserDAO.login({ username, passwd });

    if (resp.success) {
      res.json({ id: resp.id });
    } else {
      res.json("Wrong username or password")
    }
  } catch (err) {
    next(err);
  }
};

const manageUser = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const newPriviledge = req.body.priviledge;
    const resp = await UserDAO.updatePriviledges(userId, newPriviledge);
    res.json(resp);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserDAO.destroy(userId);
    res.json(`User with id ${userId} was deleted`)
  } catch (err) {
    next(err);
  }
};

export default {
  signin,
  login,
  manageUser,
  deleteUser
};
