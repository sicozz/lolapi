import jwt from 'jsonwebtoken';

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
      // create jwt with user id and permissions
      const jwtUser = { username, priviledges };
      // jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
      const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ accessToken });
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
    const loginResp = await UserDAO.login({ username, passwd });

    if (loginResp) {
      // jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
      const accessToken = jwt.sign(loginResp, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ accessToken });
    } else {
      return res.json('Wrong username or password');
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
    const userId = req.user.id;
    const xlsxFileName = await UserChampionDAO.getChampionsXLSX(userId);
    return res.sendFile(xlsxFileName, { root: process.cwd() });
  } catch (err) {
    return next(err);
  }
};

const addChampionsXLSX = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('Excel could not be loaded');
    }
    const userId = req.user.id;
    const filePath = req.file.path;
    await UserChampionDAO.addChampionsXLSX(userId, filePath);
    return res.json("Champions added succesfully");
  } catch (err) {
    return next(err);
  }
};

const playableChampionsXLSX = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('Excel could not be loaded');
    }
    const filePath = req.file.path;
    await UserChampionDAO.playableChampionsXLSX(filePath);
    return res.sendFile(filePath, { root: process.cwd() });
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
  addChampionsXLSX,
  playableChampionsXLSX,
};
