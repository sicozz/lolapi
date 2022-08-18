import UserDAO from '../services/user.js';
import UserChampionDAO from '../services/userChampion.js';
import priviledges from '../helpers/priviledges.js';

const signin = async (req, res, next) => {
  try {
    const { username } = req.body;
    const passwd = req.body.password;
    const priviledge = priviledges.user;
    const user = {
      username,
      passwd,
      priviledges: priviledge,
    };
    const id = await UserDAO.create(user);

    if (id) {
      req.session.user = id;
      res.json('Signin successful');
    } else {
      throw new Error('signin failed');
    }
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username } = req.body;
    const passwd = req.body.password;
    const resp = await UserDAO.login({ username, passwd });

    if (resp.success) {
      req.session.user = resp.id;
      res.json('Login successful');
    } else {
      res.json('Wrong username or password');
    }
  } catch (err) {
    return next(err);
  }
};

const manageUser = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const newPriviledge = req.body.priviledge;
    const resp = await UserDAO.updatePriviledges(userId, newPriviledge);
    res.json(resp);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await UserDAO.destroy(userId);
    res.json(`User with id ${userId} was deleted`);
  } catch (err) {
    return next(err);
  }
};

const getChampions = async (req, res, next) => {
  try {
    const userId = req.session.user;
    const champions = await UserChampionDAO.findUserChampions(userId);
    res.json(champions);
  } catch (err) {
    return next(err);
  }
};

const addChampions = async (req, res, next) => {
  try {
    const userId = req.session.user;
    res.json('Add champions not implemented yet');
  } catch (err) {
    return next(err);
  }
};

export default {
  signin,
  login,
  manageUser,
  deleteUser,
  getChampions,
  addChampions,
};
