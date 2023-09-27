// UserData
const currentUserData = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export default currentUserData;
