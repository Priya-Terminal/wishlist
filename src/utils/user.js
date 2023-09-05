const saveUser = ({ localStorage }, user) => {
  console.log("saveUser", user);
  localStorage.setItem("user", JSON.stringify(cleanUser(user)));
};

const getUser = ({ localStorage }) => {
  const user = localStorage.getItem("user");
  console.log("getUser", user);
  return user ? JSON.parse(user) : null;
};

const removeUser = ({ localStorage }) => {
  console.log("removeUser");
  localStorage.removeItem("user");
};

const cleanUser = (user) => {
  const { password, __v, _id, ...cleanedUser } = user;
  if (_id && !cleanedUser.id) {
    cleanedUser.id = _id;
  }
  return cleanedUser;
};

const saveUserToSession = async (req, user) => {
  req.session.user = cleanUser(user);
  await req.session.save();
};

export { saveUser, getUser, removeUser, saveUserToSession, cleanUser };
