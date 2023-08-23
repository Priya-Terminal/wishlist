const saveUser = ({ localStorage }, user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = ({ localStorage }) => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const removeUser = ({ localStorage }) => {
  localStorage.removeItem("user");
};

export { saveUser, getUser, removeUser };
