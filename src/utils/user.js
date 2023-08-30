const saveUser = ({ localStorage }, user) => {
  console.log("saveUser", user);
  localStorage.setItem("user", JSON.stringify(user));
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

export { saveUser, getUser, removeUser };
