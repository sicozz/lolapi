import bcrypt from 'bcrypt';

import User from '../models/user.js';

const SALT = 10;

const findUser = async id => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error(`No user with id ${id} to be deleted`);
  };
  return user;
};

const create = async user => {
  user.passwd = await bcrypt.hash(user.passwd, SALT);
  const createResp = await User.create(user);
  return createResp.dataValues.id;
};

const login = async user => {
  const dbUser = await User.findOne({ where: { username: user.username } })
  if (await bcrypt.compare(user.passwd, dbUser.passwd)) {
    return { success: true, id: dbUser.id };
  } else {
    return { success: false }
  }
};

const updatePriviledges = async (id, priviledge) => {
  const user = await findUser(id);
  const resp = user.update({ priviledges: priviledge });
  return resp;
};

const destroy = async id => {
  const user = await findUser(id);

  // Soft delete (cascade)
  await user.destroy();
};

export default {
  create,
  login,
  updatePriviledges,
  destroy
};
