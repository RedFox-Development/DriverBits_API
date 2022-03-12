

const User = require('../models/user');
const hashing = require('../../tools/hashing');

const addUser = async ({name, username, email, password, type, did, cid}) => {
  let user = new User({
    name: name,
    username: username,
    email: email,
    pwhash: await hashing(password),
    type: type,
  });
  if (type !== 'MANAGER') {
    user.domains = [did];
    user.customer = cid;
  }
  try {
    await user.save();
    user = await User.findOne({username: username}).populate('customer').populate('domains').exec();
  } catch (e) {
    console.warn(e);
  }
  return user;
};

const countUsers = async ({type = null, did = null, cid = null}) => {
  let count = 0;
  if (type) {
    count = await User.countDocuments({type: type});
  } else if (did) {
    count = await User.countDocuments({domains: did});
  } else if (cid) {
    count = await User.countDocuments({customer: cid});
  } else {
    count = await User.countDocuments({});
  }
  return count;
};

const findUser = async ({username = null, id = null}) => {
  let user = null;
  if (id) {
    user = await User.findOne({_id: id}).populate('customer').populate('domains').exec();
  } else if (username) {
    user = await User.findOne({username: username}).populate('customer').populate('domains').exec();
  }
  return user;
};

const findUsers = async ({type, cid, did}) => {
  let users = null;
  if (type) {
    users = await User.find({type: type}).populate('customer').populate('domains').exec();
  } else if (did) {
    users = await User.find({domains: did}).populate('customer').populate('domains').exec();
  } else if (cid) {
    users = await User.find({customer: cid}).populate('customer').populate('domains').exec();
  } else {
    users = await User.find({}).populate('customer').populate('domains').exec();
  }
  return users;
};

module.exports = {
  addUser,
  countUsers,
  findUser,
  findUsers
};